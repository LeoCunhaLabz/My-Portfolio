"use client"

import { useState } from "react";
import { SectionHeader } from "@/components/sectionHeader";
import { Card } from "@/components/Card";

export const BlogSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hp, setHp] = useState("");

  const validateEmail = (value: string) => {
    if (!value) return "Please enter your email.";
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    if (!re.test(value)) return "Please enter a valid email.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const v = validateEmail(email.trim());
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), hp }),
      });
      const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Subscription failed");
  setSuccess("Thanks — you'll be notified when the blog goes live.");
      setEmail("");
  setHp("");
    } catch (err: any) {
      setError(err?.message || "Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="blog" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Thoughts"
          title="Blog"
          description="I'm preparing long-form posts about design, frontend architecture and product — coming soon."
        />
        <div className="mt-12 flex justify-center">
          <Card className="max-w-xl text-center px-8 py-12">
            <h3 className="font-serif text-2xl md:text-3xl">Coming soon</h3>
            <p className="mt-4 text-white/70">I’m preparing posts about design, frontend architecture and product. Want to be notified?</p>
            <form onSubmit={handleSubmit} className="mt-6">
              {/* honeypot field for bots */}
              <input value={hp} onChange={(e) => setHp(e.target.value)} name="hp" className="sr-only" aria-hidden />
              <div className="flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center">
                <input
                  type="email"
                  className="w-full md:flex-1 bg-gray-900/60 placeholder:text-white/40 text-white px-4 py-3 rounded-xl"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email for notification"
                />
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center px-4 md:px-6 h-12 rounded-xl bg-white text-gray-900 font-semibold whitespace-nowrap"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Notify me"}
                </button>
              </div>
              <div className="mt-4">
                {error && <div className="text-rose-400">{error}</div>}
                {success && <div className="text-emerald-300">{success}</div>}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
