import Link from "next/link";

import type { GetPostsQuery } from "@/generated/graphql";
import { hygraph } from "@/lib/hygraph";

import type { GetStaticProps, NextPage } from "next";

type Props = {
  posts: GetPostsQuery["posts"];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { posts } = await hygraph.getPosts();
  return { props: { posts } };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="mx-auto max-w-3xl py-12">
      <h1 className="text-2xl font-bold">Heading</h1>
      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            <a>
              {post.title} {post.date} {post.excerpt}
            </a>
          </Link>
          <ul>
            {post.tags.map((tag) => (
              <li key={tag.slug}>{tag.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Home;
