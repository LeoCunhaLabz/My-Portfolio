import Link from "next/link";
import { ContactNavButton } from "@/components/ContactNavButton";
import { posts } from "@/content/blog";

// On the home page the links scroll to its sections; on phones Writing stays
// hidden there, since a fifth link pushes Contact out of view (#9). They are
// Next.js links, so Back still works after visiting another page from a section. The other
// pages have a menu of their own: back to the home page, the case studies, the
// blog and the contact options, which open over the page. Until a post is
// published, Writing points to the home section.
export const Header = ({ page = "home" }: { page?: "home" | "projects" | "blog" | "newsletter" }) => {
  const hasPosts = posts.length > 0;
  const writingHref = hasPosts ? "/blog" : "/#blog";

  // The link to the page being viewed is highlighted and announced as current.
  const linkProps = (className: string, isCurrent: boolean) =>
    isCurrent ? { className: `${className} bg-white/10 text-white`, "aria-current": "page" as const } : { className };

  return (
    <>
      {/* The first stop for keyboard users: it appears on focus and jumps past the menu. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
      >
        Skip to content
      </a>
      <div className = "flex justify-center items-center fixed top-3 w-full z-10 px-2">
        <nav aria-label="Main" className = "flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur overflow-x-auto max-w-full">
          {page === "home" ? (
            <>
              <Link href="#home" className="nav-item hidden md:inline-flex">
                Home
              </Link>
              <Link href="#experience" className="nav-item">
                Experience
              </Link>
              <Link href="#projects" className="nav-item">
                Work
              </Link>
              <Link href="#about" className="nav-item">
                About
              </Link>
              <Link href="#blog" className="nav-item hidden md:inline-flex">
                Writing
              </Link>
              <Link href="#contact" className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900">
                Contact
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className="nav-item gap-1.5">
                <span aria-hidden="true">&larr;</span>
                <span>Home</span>
              </Link>
              <Link href="/projects" {...linkProps("nav-item", page === "projects")}>
                Case studies
              </Link>
              <Link href={writingHref} {...linkProps("nav-item", page === "blog")}>
                Writing
              </Link>
              <ContactNavButton className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900" />
            </>
          )}
        </nav>
      </div>
    </>
  );
};
