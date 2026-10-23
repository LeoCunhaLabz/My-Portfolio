"use client";

import { pageview } from "@vercel/analytics";
import Link from "next/link";
import type { MDXModule } from "mdx/types";
import { type MouseEvent, Suspense, use, useEffect, useId, useRef, useSyncExternalStore } from "react";
import { CaseStudyHeader } from "@/components/CaseStudyHeader";
import { CASE_STUDY_HASH_PREFIX as HASH_PREFIX, caseStudyHash, projects } from "@/content/projects";

// The case studies opened from the home page, in a modal, so visitors stay on the
// page. The link on each card points to #case-<slug>: a click adds that hash to
// the URL and opens the modal, and Back closes it, like on any other page. The X
// button, Escape and a click outside close it too. A shared link with that hash
// opens the modal on load. The case study text is loaded only when a visitor
// hovers, focuses or opens a card.

const isCaseStudy = (slug: string | undefined): slug is string =>
  Boolean(slug) && projects.some((project) => project.slug === slug);

const slugFromHash = () => {
  const { hash } = window.location;
  const slug = hash.slice(HASH_PREFIX.length);
  return hash.startsWith(HASH_PREFIX) && isCaseStudy(slug) ? slug : null;
};

const caseStudyLinkSlug = (target: EventTarget | null) => {
  const link = target instanceof Element ? target.closest(`a[href^="${HASH_PREFIX}"]`) : null;
  const slug = link?.getAttribute("href")?.slice(HASH_PREFIX.length);
  return isCaseStudy(slug) ? slug : null;
};

// The hash is the modal's state. pushState and replaceState don't fire hashchange,
// so the modal's own URL changes notify the listeners directly. Both get null as
// state, so Next.js adds its own and Back still works after leaving the page.
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

// True when the case study was opened from a link on this page, so Back leads to
// where the visitor was. A link opened from elsewhere has nothing to go back to
// inside the page, so closing it just drops the hash.
let openedOnThisPage = false;

const subscribe = (onChange: () => void) => {
  const onHashChange = () => {
    openedOnThisPage = slugFromHash() !== null;
    onChange();
  };
  listeners.add(onChange);
  window.addEventListener("hashchange", onHashChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("hashchange", onHashChange);
  };
};

const openCaseStudy = (slug: string) => {
  window.history.pushState(null, "", caseStudyHash(slug));
  openedOnThisPage = true;
  notify();
};

const closeCaseStudy = () => {
  if (openedOnThisPage) {
    window.history.back();
  } else {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    notify();
  }
};

// Each case study's text is fetched once, then kept for the rest of the visit.
const caseStudyModules = new Map<string, Promise<MDXModule>>();
const loadCaseStudy = (slug: string) => {
  let loading = caseStudyModules.get(slug);
  if (!loading) {
    loading = import(`@/content/projects/${slug}.mdx`) as Promise<MDXModule>;
    caseStudyModules.set(slug, loading);
  }
  return loading;
};

const CaseStudyBody = ({ slug }: { slug: string }) => {
  const { default: CaseStudy } = use(loadCaseStudy(slug));
  return <CaseStudy />;
};

export const CaseStudyModal = () => {
  const slug = useSyncExternalStore(subscribe, slugFromHash, () => null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleId = useId();
  const shownSlug = useRef<string | null>(null);

  const index = projects.findIndex((project) => project.slug === slug);
  const project = index >= 0 ? projects[index] : null;
  const next = projects[(index + 1) % projects.length];

  // Open and close the native dialog with the hash. Switching to another case study
  // starts it from the top and moves focus to its title.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!slug) {
      if (dialog.open) dialog.close();
      shownSlug.current = null;
      return;
    }
    if (!dialog.open) {
      dialog.showModal();
    } else if (shownSlug.current !== slug) {
      scrollRef.current?.scrollTo({ top: 0 });
      titleRef.current?.focus();
    }
    shownSlug.current = slug;
    // The analytics script only sees page loads, so each case study shown here
    // counts as a visit to its page, like the CV clicks in SiteAnalytics.
    pageview({ route: "/projects/[slug]", path: `/projects/${slug}` });
  }, [slug]);

  // The page behind the modal doesn't scroll while it is open.
  useEffect(() => {
    if (!slug) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [slug]);

  // The card links: a plain click opens the modal (a click with a modifier key
  // still opens a new tab), and a pointer or the keyboard reaching a link starts
  // loading its case study.
  useEffect(() => {
    const onClick = (event: globalThis.MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const linkSlug = caseStudyLinkSlug(event.target);
      if (!linkSlug) return;
      event.preventDefault();
      openCaseStudy(linkSlug);
    };
    const preload = (event: Event) => {
      const linkSlug = caseStudyLinkSlug(event.target);
      if (linkSlug) loadCaseStudy(linkSlug);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", preload);
    document.addEventListener("focusin", preload);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", preload);
      document.removeEventListener("focusin", preload);
    };
  }, []);

  // A click on the backdrop lands on the dialog itself; clicks on the panel land inside it.
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeCaseStudy();
  };

  const showNext = () => {
    window.history.replaceState(null, "", caseStudyHash(next.slug));
    notify();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={project ? titleId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        closeCaseStudy();
      }}
      onClose={() => {
        // The browser can close the dialog on its own (a second Escape, for one).
        if (slugFromHash()) closeCaseStudy();
      }}
      onClick={onDialogClick}
      className="case-dialog m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-gray-900 p-0 text-white backdrop:bg-gray-950/80 md:m-auto md:h-[calc(100dvh-4rem)] md:w-[calc(100%-4rem)] md:max-w-3xl md:rounded-3xl md:border md:border-white/15 md:shadow-2xl md:shadow-black/60"
    >
      {project && (
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 py-2 pl-6 pr-3 md:pl-10">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">
              Case study {index + 1} of {projects.length}
            </p>
            <button
              type="button"
              onClick={closeCaseStudy}
              aria-label="Close the case study"
              className="grid size-11 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-6 pb-16 pt-8 md:px-10">
            <CaseStudyHeader project={project} titleId={titleId} titleRef={titleRef} />

            <Suspense fallback={<p className="mt-14 text-white/60">Loading the case study…</p>}>
              <CaseStudyBody slug={project.slug} />
            </Suspense>

            <nav aria-label="More case studies" className="mt-20 border-t border-white/15 pt-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/50">Next case study</p>
              <button
                type="button"
                onClick={showNext}
                className="group mt-3 block rounded text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <span className="font-serif text-2xl transition-colors group-hover:text-emerald-300 md:text-3xl">
                  {next.name} <span aria-hidden="true">&rarr;</span>
                </span>
                <span className="mt-2 block text-white/60">{next.headline}</span>
              </button>
              <Link
                href="/projects"
                className="mt-8 inline-flex rounded text-sm font-semibold text-white/60 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                All case studies
              </Link>
            </nav>
          </div>
        </div>
      )}
    </dialog>
  );
};
