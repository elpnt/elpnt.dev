import markdownToTxt from "markdown-to-txt";

import { Posts } from "@/components/Posts";
import { Seo } from "@/components/Seo";
import { hygraph } from "@/lib/hygraph";
import type { PostSummary } from "@/types";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

type Params = {
  slug: string;
};

type Props = {
  tagName: string;
  posts: PostSummary[];
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { tags } = await hygraph.getTags();
  const paths = tags.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { slug } = params as Params;
  const { tag } = await hygraph.getPostsByTagSlug({ slug });

  if (!tag) {
    return {
      notFound: true,
    };
  }
  const { name, posts } = tag;
  const data = posts.map((post) => {
    const { content, ...rest } = post;
    const excerpt = markdownToTxt(content).slice(0, 150);
    return { ...rest, excerpt };
  });

  return { props: { tagName: name, posts: data } };
};

const Tag: NextPage<Props, Params> = ({ tagName, posts }) => {
  return (
    <>
      <Seo title={tagName} />
      <Posts title={tagName} posts={posts} />
    </>
  );
};

export default Tag;
