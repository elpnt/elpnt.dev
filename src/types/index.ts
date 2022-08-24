import type {
  GetPostBySlugQuery,
  GetPostsQuery,
  Tag,
} from "@/generated/graphql";

import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Post = Omit<NonNullable<GetPostBySlugQuery["post"]>, "content"> & {
  mdxSource: MDXRemoteSerializeResult;
};
export type PostSummary = Omit<GetPostsQuery["posts"][number], "content"> & {
  excerpt: string;
};

export type PostTag = Pick<Tag, "name" | "slug">;
