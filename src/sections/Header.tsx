import { posts } from "@/content/blog";

// On the home page the links scroll to its sections. On the other pages they
// lead back to those sections, except Work and Writing, which open /projects and
// /blog. Until a post is published, Writing points to the home section. On phones
// Writing stays hidden, since a fifth link pushes Contact out of view (#9).
export const Header = ({ page = "home" }: { page?: "home" | "projects" | "blog" }) => {
  const onHome = page === "home";
  const section = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const hasPosts = posts.length > 0;

  // The link to the page being viewed is highlighted and announced as current.
  const linkProps = (className: string, isCurrent: boolean) =>
    isCurrent ? { className: `${className} bg-white/10 text-white`, "aria-current": "page" as const } : { className };

  return (
    <div className = "flex justify-center items-center fixed top-3 w-full z-10 px-2">
      <nav className = "flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur overflow-x-auto max-w-full">
        <a href={section("home")} className="nav-item hidden md:inline-flex">
          Home
        </a>
        <a href={section("experience")} className="nav-item">
          Experience
        </a>
        <a href={onHome ? "#projects" : "/projects"} {...linkProps("nav-item", page === "projects")}>
          Work
        </a>
        <a href={section("about")} className="nav-item">
          About
        </a>
        <a
          href={onHome || !hasPosts ? section("blog") : "/blog"}
          {...linkProps("nav-item hidden md:inline-flex", page === "blog")}
        >
          Writing
        </a>
        <a href={section("contact")} className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900">
          Contact
        </a>
      </nav>
    </div>
  );
};
