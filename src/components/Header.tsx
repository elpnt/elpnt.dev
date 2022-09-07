import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import Icon from "public/icon.png";

import { ThemeSelector } from "./ThemeSelector";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export const Header = () => {
  return (
    <div className="sticky top-0 z-10 min-h-full bg-white/90 backdrop-blur dark:bg-gray-900/70">
      <Disclosure as="nav">
        {({ open }) => (
          <>
            {/* Desktop navigation */}
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Link href="/">
                    <a className="relative hidden h-12 w-12 flex-shrink-0 overflow-hidden rounded-full sm:block">
                      <Image src={Icon} alt="Profile pic" />
                      <div className="absolute top-0 left-0 h-full w-full rounded-full shadow-inner shadow-gray-500/50" />
                    </a>
                  </Link>
                  <div className="hidden sm:block">
                    <div className="ml-10 flex items-center space-x-4">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="ml-4 flex items-center sm:ml-6">
                    <ThemeSelector />
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="flex w-full items-center justify-between sm:hidden">
                  <Disclosure.Button
                    className={clsx(
                      "inline-flex items-center justify-center rounded-md p-2",
                      "text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600",
                      "dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-white dark:focus:ring-offset-gray-800"
                    )}
                  >
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                  <ThemeSelector />
                </div>
              </div>
            </div>

            {/* Mobile navigation */}
            <Disclosure.Panel className="bg-white dark:bg-gray-900 sm:hidden">
              <div className="space-y-1 border-y border-gray-200 px-2 py-3 dark:border-gray-700">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <Disclosure.Button
                      as="a"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
