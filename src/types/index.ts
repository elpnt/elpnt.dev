import type {
  GetPostBySlugQuery,
  GetPostsQuery,
  Tag,
} from "@/generated/graphql";

export type Post = NonNullable<GetPostBySlugQuery["post"]>;
export type PostSummary = Omit<GetPostsQuery["posts"][number], "content"> & {
  excerpt: string;
};

export type PostTag = Pick<Tag, "name" | "slug">;
