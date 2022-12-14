import { ChevronLeftIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

import { DateFormatter } from "@/components/DateFormatter";
import { Link } from "@/components/Link";
import { Seo } from "@/components/Seo";
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
  const paths = posts.map(({ slug }) => ({
    params: { slug },
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
  const { title, date, tags, coverImage } = meta;

  return (
    <>
      <Seo title={title} imageUrl={coverImage?.url} />
      <BackToTop />
      <article className="mt-6">
        <header>
          <span className="block text-sm text-gray-700 dark:text-gray-400">
            <DateFormatter date={date} />
          </span>
          <h1 className="mt-1 block text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl sm:tracking-tight">
            {title}
          </h1>
          <ul className="mt-4 flex flex-row space-x-2 pl-0">
            {tags.map((tag) => (
              <TagBadge key={tag.slug} {...tag} />
            ))}
          </ul>
          {coverImage && (
            <div className="aspect-h-9 aspect-w-16 relative mt-6 w-full overflow-hidden rounded">
              <Image
                src={coverImage.url}
                alt="Cover image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
        </header>
        <div
          className={clsx(
            "prose prose-indigo mt-12 max-w-none dark:prose-invert",
            "prose-h2:block prose-h2:border-b dark:prose-h2:border-gray-600"
          )}
        >
          <MDXRemote {...mdxSource} />
        </div>
      </article>
    </>
  );
};

const BackToTop = () => {
  return (
    <Link
      href="/"
      className="group inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
    >
      <ChevronLeftIcon className="-ml-1 h-4 w-4 text-gray-500 group-hover:text-gray-400" />
      Back to Top
    </Link>
  );
};

export default Post;
