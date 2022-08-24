import clsx from "clsx";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

import { DateFormatter } from "@/components/DateFormatter";
import { TagBadge } from "@/components/TagBadge";
import type { GetPostBySlugQuery } from "@/generated/graphql";
import { hygraph } from "@/lib/hygraph";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

type Params = {
  slug: string;
};

type Props = {
  meta: Omit<NonNullable<GetPostBySlugQuery["post"]>, "content">;
  mdxSource: MDXRemoteSerializeResult;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { posts } = await hygraph.getPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { slug } = params as Params;
  const { post } = await hygraph.getPostBySlug({ slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  const { content, ...meta } = post;
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeCodeTitles, rehypePrism],
    },
  });
  return { props: { meta, mdxSource } };
};

const Post: NextPage<Props, Params> = ({ meta, mdxSource }) => {
  const { title, date, tags } = meta;

  return (
    <article
      className={clsx("prose max-w-none", "prose-h2:block prose-h2:border-b")}
    >
      <span className="block text-sm text-gray-700">
        <DateFormatter date={date} />
      </span>
      <h1 className="mt-2 mb-4 block text-2xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
        {title}
      </h1>
      <ul className="flex flex-row space-x-2 pl-0">
        {tags.map((tag) => (
          <TagBadge name={tag.name} key={tag.slug} />
        ))}
      </ul>
      <MDXRemote {...mdxSource} />
    </article>
  );
};

export default Post;
