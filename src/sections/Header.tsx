// On the home page the links scroll to its sections. On the project pages they
// lead back to those sections, except Work, which stays on /projects.
export const Header = ({ page = "home" }: { page?: "home" | "projects" }) => {
  const onHome = page === "home";
  const section = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <div className = "flex justify-center items-center fixed top-3 w-full z-10 px-2">
      <nav className = "flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur overflow-x-auto max-w-full">
        <a href={section("home")} className="nav-item hidden md:inline-flex">
          Home
        </a>
        <a href={section("experience")} className="nav-item">
          Experience
        </a>
        <a
          href={onHome ? "#projects" : "/projects"}
          className={onHome ? "nav-item" : "nav-item bg-white/10 text-white"}
          {...(onHome ? {} : { "aria-current": "page" as const })}
        >
          Work
        </a>
        <a href={section("about")} className="nav-item">
          About
        </a>
        <a href={section("blog")} className="nav-item hidden md:inline-flex">
          Writing
        </a>
        <a href={section("contact")} className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900">
          Contact
        </a>
      </nav>
    </div>
  );
};
