import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

type Props = {
  title: string;
  description?: string;
  imageUrl?: string;
};

export const Seo = (props: Props) => {
  const {
    title,
    description = "Matsuoka's website",
    imageUrl = "https://media.graphassets.com/MyPEHX5mSwOPuylqx41Q",
  } = props;
  const router = useRouter();

  // "/posts/[slug]" -> ["", "posts", "[slug]"]
  const isPost = router.asPath.split("/")[1] === "posts";

  return (
    <NextSeo
      title={title}
      titleTemplate="%s | elpnt.dev"
      description={description}
      canonical="https://elpnt.dev"
      openGraph={{
        type: isPost ? "article" : "website",
        site_name: "elpnt.dev",
        images: [
          {
            url: imageUrl,
          },
        ],
      }}
      twitter={{
        handle: "@elpn_t",
        site: "@elpn_t",
        cardType: "summary_large_image",
      }}
    />
  );
};
