import { useState } from "react";

import { BookOpenIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import type { PostSummary } from "@/types";

import { DateFormatter } from "./DateFormatter";
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
      <Link href={href}>
        <a className="flex-shrink-0 sm:mr-4">
          {coverImage ? (
            <div className="relative h-48 w-full overflow-hidden rounded sm:h-36 sm:w-48">
              <Image
                src={coverImage.url}
                alt="cover image"
                layout="fill"
                objectFit="cover"
                className={clsx(hover && "scale-110", "transition")}
                onMouseOver={handleOnMouseOver}
                onMouseLeave={handleOnMouseLeave}
              />
            </div>
          ) : (
            <div
              className="grid h-36 w-full place-items-center overflow-hidden rounded border border-gray-300 bg-gray-900 sm:w-48"
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
        </a>
      </Link>
      <div className="mt-4 w-full sm:mt-0">
        <p className="text-sm text-gray-500">
          <DateFormatter date={date} />
        </p>
        <Link href={href}>
          <a
            className="mt-2 block"
            onMouseOver={handleOnMouseOver}
            onMouseLeave={handleOnMouseLeave}
          >
            <p
              className={clsx(
                hover ? "text-indigo-600" : "text-gray-900",
                "text-xl font-semibold"
              )}
            >
              {title}
            </p>
            <p className="mt-3 text-sm text-gray-500 line-clamp-2">{excerpt}</p>
          </a>
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
    <div className="relative mx-auto max-w-7xl divide-y-2 divide-gray-200">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
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
