import markdownToTxt from "markdown-to-txt";

import { Posts } from "@/components/Posts";
import { Seo } from "@/components/Seo";
import { hygraph } from "@/lib/hygraph";
import type { PostSummary } from "@/types";

import type { GetStaticProps, NextPage } from "next";

type Props = {
  posts: PostSummary[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { posts } = await hygraph.getPosts();
  const data = posts.map((post) => {
    const { content, ...rest } = post;
    const excerpt = markdownToTxt(content).slice(0, 150);
    return { ...rest, excerpt };
  });

  return { props: { posts: data } };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Seo title="TOP" />
      <Posts posts={posts} />
    </>
  );
};

export default Home;
