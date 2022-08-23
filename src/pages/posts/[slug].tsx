import type { GetPostBySlugQuery } from "@/generated/graphql";
import { hygraph } from "@/lib/hygraph";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

type Params = {
  slug: string;
};

type Props = {
  post: NonNullable<GetPostBySlugQuery["post"]>;
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
  return { props: { post } };
};

const Post: NextPage<Props, Params> = ({ post }) => {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
};

export default Post;
