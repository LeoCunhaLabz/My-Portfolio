import Link from "next/link";
import { Card } from "@/components/Card";
import { StackList } from "@/components/ProjectEyebrow";
import type { Post } from "@/content/blog";

const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });

const PostDate = ({ date }: { date: string }) => <time dateTime={date}>{dateFormat.format(new Date(date))}</time>;

// The small line above a post's title: publication date, update date and, on
// previews, a Draft label.
export const PostEyebrow = ({ post }: { post: Post }) => (
  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold uppercase tracking-widest text-emerald-300">
    <PostDate date={post.publishedAt} />
    {post.updatedAt && (
      <>
        <span aria-hidden="true">&bull;</span>
        <span>
          Updated <PostDate date={post.updatedAt} />
        </span>
      </>
    )}
    {post.status === "draft" && (
      <span className="rounded-full bg-amber-300 px-2 py-0.5 text-xs tracking-wider text-gray-900">Draft</span>
    )}
  </p>
);

export const PostTags = ({ post }: { post: Post }) => <StackList stack={post.tags} label="Topics" />;

// One post on the home page and on /blog. The title link covers the whole card.
export const PostCard = ({ post, headingLevel = "h3" }: { post: Post; headingLevel?: "h2" | "h3" }) => {
  const Heading = headingLevel;

  return (
    <Card className="group p-6 transition-colors focus-within:ring-2 focus-within:ring-emerald-300 hover:bg-gray-800/80 md:p-8">
      <PostEyebrow post={post} />
      <Heading className="mt-3 font-serif text-2xl md:text-3xl">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors before:absolute before:inset-0 before:content-[''] focus:outline-none group-hover:text-emerald-300"
        >
          {post.title}
        </Link>
      </Heading>
      <p className="mt-3 leading-relaxed text-white/70">{post.summary}</p>
      <div className="mt-6">
        <PostTags post={post} />
      </div>
    </Card>
  );
};
