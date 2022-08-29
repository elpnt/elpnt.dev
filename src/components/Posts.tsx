import { useState } from "react";

import { BookOpenIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Image from "next/image";

import type { PostSummary } from "@/types";

import { DateFormatter } from "./DateFormatter";
import { Link } from "./Link";
import { TagBadge } from "./TagBadge";

type PostCardProps = {
  post: PostSummary;
};

const PostCard = ({ post }: PostCardProps) => {
  const { slug, date, title, coverImage, tags, excerpt } = post;
  const href = `/posts/${slug}`;

  const [hover, setHover] = useState(false);
  const handleOnMouseOver = () => setHover(true);
  const handleOnMouseLeave = () => setHover(false);

  return (
    <div className="sm:flex">
      <Link href={href} className="flex-shrink-0 sm:mr-4">
        {coverImage ? (
          <div
            onMouseOver={handleOnMouseOver}
            onMouseLeave={handleOnMouseLeave}
            className="relative h-48 w-full overflow-hidden rounded border border-gray-300 dark:border-gray-700 sm:h-36 sm:w-48"
          >
            <Image
              src={coverImage.url}
              alt="cover image"
              layout="fill"
              objectFit="cover"
              className={clsx(hover && "scale-110", "transition")}
            />
          </div>
        ) : (
          <div
            className="grid h-48 w-full place-items-center overflow-hidden rounded border border-gray-300 bg-gray-900 dark:border-gray-700 sm:h-36 sm:w-48"
            onMouseOver={handleOnMouseOver}
            onMouseLeave={handleOnMouseLeave}
          >
            <BookOpenIcon
              className={clsx(
                hover && "scale-110",
                "h-12 w-12 stroke-1 text-gray-300 transition"
              )}
            />
          </div>
        )}
      </Link>
      <div className="mt-4 w-full sm:mt-0">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <DateFormatter date={date} />
        </p>
        <Link
          href={href}
          className="mt-2 block"
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
        >
          <p
            className={clsx(
              hover
                ? "text-indigo-600 dark:text-indigo-500"
                : "text-gray-900 dark:text-white",
              "text-xl font-semibold"
            )}
          >
            {title}
          </p>
          <p className="mt-3 text-sm text-gray-500 line-clamp-2 dark:text-gray-400">
            {excerpt}
          </p>
        </Link>
        <div className="mt-3 flex flex-row space-x-2">
          {tags.map((tag) => (
            <TagBadge key={tag.slug} {...tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

type PostsProps = {
  title?: string;
  posts: PostSummary[];
};

export const Posts = ({ title = "Posts", posts }: PostsProps) => {
  return (
    <div className="relative mx-auto max-w-7xl divide-y-2 divide-gray-200 dark:divide-gray-700">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl sm:tracking-tight">
        {title}
      </h2>
      <div className="mt-6 grid gap-16 pt-10 sm:gap-y-12">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};
