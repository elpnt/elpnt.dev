import Image from "next/image";

import Icon from "public/icon.png";

import { Seo } from "@/components/Seo";

import type { NextPage } from "next";

const About: NextPage = () => {
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

      <h3 className="mt-12 text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
        Inkdrop Plugins
      </h3>
      <div className="mt-2 border-t-2 border-gray-200 dark:border-gray-700">
        WIP
      </div>
    </>
  );
};

export default About;
