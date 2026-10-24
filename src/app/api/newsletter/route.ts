import { siteUrl } from "@/content/site";

// Newsletter sign-up (#6). The address goes straight to Brevo, which sends the
// confirmation email (double opt-in), keeps the list and handles unsubscribes.
// Nothing is stored here, and the logs never include the address.

export type NewsletterStatus = "pending" | "already_subscribed" | "invalid_email" | "error";

const brevoContactsUrl = "https://api.brevo.com/v3/contacts";
const brevoDoiUrl = `${brevoContactsUrl}/doubleOptinConfirmation`;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reply = (status: NewsletterStatus, httpStatus: number) => Response.json({ status }, { status: httpStatus });

// Where the link in the confirmation email leads. Previews send it to their own
// deployment, so the whole flow can be tested before merging.
const confirmedUrl = () => {
  const origin =
    process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : siteUrl;
  return `${origin}/newsletter/confirmed`;
};

export async function POST(request: Request) {
  let body: { email?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return reply("invalid_email", 400);
  }

  // A hidden field people never see. Bots that fill it get the usual answer and
  // nothing is sent to Brevo.
  if (typeof body.website === "string" && body.website !== "") return reply("pending", 200);

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (email.length > 254 || !emailPattern.test(email)) return reply("invalid_email", 400);

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);
  if (!apiKey || !Number.isInteger(listId) || !Number.isInteger(templateId)) {
    console.error("newsletter: BREVO_API_KEY, BREVO_LIST_ID or BREVO_DOI_TEMPLATE_ID is not set");
    return reply("error", 503);
  }

  const headers = { "api-key": apiKey, accept: "application/json" };
  // One deadline for both calls to Brevo.
  const signal = AbortSignal.timeout(8000);

  let response: Response;
  try {
    // Brevo sends the confirmation email again even to people who already
    // confirmed, so look the address up first. Anyone not on the list, or who
    // unsubscribed, goes through the confirmation again.
    const existing = await fetch(`${brevoContactsUrl}/${encodeURIComponent(email)}?identifierType=email_id`, {
      headers,
      signal,
    });
    if (existing.ok) {
      const contact: { listIds?: number[]; emailBlacklisted?: boolean } = await existing.json();
      if (contact.listIds?.includes(listId) && !contact.emailBlacklisted) return reply("already_subscribed", 409);
    } else if (existing.status !== 404) {
      console.error("newsletter: Brevo contact lookup failed", existing.status);
    }

    response = await fetch(brevoDoiUrl, {
      method: "POST",
      headers: { ...headers, "content-type": "application/json" },
      body: JSON.stringify({
        email,
        includeListIds: [listId],
        templateId,
        redirectionUrl: confirmedUrl(),
      }),
      signal,
    });
  } catch (error) {
    console.error("newsletter: Brevo did not answer", error instanceof Error ? error.name : "unknown error");
    return reply("error", 504);
  }

  // Brevo answers 201 (or 204) once the confirmation email is on its way.
  if (response.ok) return reply("pending", 200);

  // Brevo's error body is { code, message }. Only the code is logged: the message
  // can quote the address.
  const { code, message } = await response.json().catch(() => ({}));
  console.error("newsletter: Brevo refused the request", response.status, code);
  if (code === "duplicate_parameter") return reply("already_subscribed", 409);
  if (response.status === 400 && typeof message === "string" && /email/i.test(message)) {
    return reply("invalid_email", 400);
  }
  return reply("error", 502);
}
