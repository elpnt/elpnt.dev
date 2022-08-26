import { DownloadIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import Image from "next/image";

import Icon from "public/icon.png";

import { Seo } from "@/components/Seo";

import type { GetStaticProps, NextPage } from "next";

type InkdropPlugin = {
  slug: string;
  name: string;
  downloads: number;
};

const pluginsInfo: Omit<InkdropPlugin, "downloads">[] = [
  { slug: "code-title", name: "Code Title" },
  { slug: "link-card", name: "Link Card" },
  { slug: "chartjs", name: "Chart.js" },
  { slug: "solidity", name: "Solidy language mode" },
];

type Props = {
  plugins: InkdropPlugin[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sleep = () => new Promise((r) => setTimeout(r, 1000));
  const getPluginsData = async () => {
    const plugins = [];
    for (const plugin of pluginsInfo) {
      await sleep();
      const response = await fetch(
        `https://api.inkdrop.app/v1/packages/${plugin.slug}`
      );
      const { downloads } = await response.json();
      plugins.push({ ...plugin, downloads });
    }
    return plugins;
  };

  const plugins = await getPluginsData();
  return {
    props: { plugins },
    revalidate: 24 * 60,
  };
};

const About: NextPage<Props> = ({ plugins }) => {
  return (
    <>
      <Seo title="About" />
      <div className="flex items-center space-x-4 lg:space-x-6">
        <div className="relative h-16 w-16 overflow-hidden rounded-full lg:h-32 lg:w-32">
          <Image src={Icon} alt="Profile pic" />
          <div className="absolute top-0 left-0 h-full w-full rounded-full shadow-inner shadow-gray-500/50" />
        </div>
        <div className="space-y-1 text-2xl font-medium leading-6">
          <h3 className="dark:text-white">Kensuke Matsuoka</h3>
          <p className="text-base text-gray-600 dark:text-gray-400">
            React / TypeScript / Next.js / Jamstack / Rust
          </p>
        </div>
      </div>

      <h3 className="mt-12 border-b-2 pb-1 text-lg font-medium leading-6 text-gray-900 dark:border-gray-700 dark:text-gray-200">
        Inkdrop Plugins
      </h3>
      <ul
        role="list"
        className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
      >
        {plugins.map(({ slug, name, downloads }) => (
          <a
            key={slug}
            href={`https://my.inkdrop.app/plugins/${slug}`}
            className="group font-medium text-gray-900"
          >
            <li className="col-span-1 flex rounded-md shadow-sm dark:shadow-gray-800">
              <div className="flex flex-1 items-center justify-between truncate rounded-md border border-gray-200 bg-transparent group-hover:bg-gray-50 dark:border-gray-700 dark:group-hover:bg-gray-800">
                <div className="flex-1 truncate px-4 py-3 dark:text-white">
                  {name}
                  <p className="mt-1 flex text-sm text-gray-500 dark:text-gray-400">
                    <DownloadIcon className="mr-2 h-5 w-5" />
                    <span className="mr-1 font-semibold text-gray-800 dark:text-gray-100">
                      {downloads}
                    </span>
                    Downloads
                  </p>
                </div>
                <div className="flex-shrink-0 pr-5 text-gray-400">
                  <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </>
  );
};

export default About;
