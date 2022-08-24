import { BookOpenIcon } from "@heroicons/react/outline";
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

  return (
    <div className="group sm:flex">
      <Link href={href}>
        <a className="flex-shrink-0 sm:mr-4">
          {coverImage ? (
            <div className="relative h-36 w-full overflow-hidden rounded sm:w-48">
              <Image
                src={coverImage.url}
                alt="cover image"
                layout="fill"
                objectFit="cover"
                className="transition group-hover:scale-125"
              />
            </div>
          ) : (
            <div className="grid h-36 w-full place-items-center overflow-hidden rounded border border-gray-300 bg-gray-900 sm:w-48">
              <BookOpenIcon className="h-12 w-12 stroke-1 text-gray-300 transition group-hover:scale-125" />
            </div>
          )}
        </a>
      </Link>
      <div className="mt-4 sm:mt-0">
        <p className="text-sm text-gray-500">
          <DateFormatter date={date} />
        </p>
        <Link href={href}>
          <a className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600">
              {title}
            </p>
            <p className="mt-3 text-sm text-gray-500 line-clamp-2">{excerpt}</p>
          </a>
        </Link>
        <div className="mt-3 flex flex-row space-x-2">
          {tags.map((tag) => (
            <TagBadge name={tag.name} key={tag.slug} />
          ))}
        </div>
      </div>
    </div>
  );
};

type PostsProps = {
  posts: PostSummary[];
};

export const Posts = ({ posts }: PostsProps) => {
  return (
    <div className="relative mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
        Posts
      </h2>
      <div className="mt-6 grid gap-16 pt-10 sm:gap-y-12">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};
