import React, { useEffect, useState } from "react";

import { SunIcon, MoonIcon } from "@heroicons/react/outline";

const LightIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <SunIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" {...props} />
  );
};

const DarkIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <MoonIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" {...props} />
  );
};

type Theme = "light" | "dark";

export const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>();

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setSelectedTheme("dark");
    } else {
      setSelectedTheme("light");
    }
  }, []);

  const handleClick = () => {
    if (selectedTheme === "dark") {
      setSelectedTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      setSelectedTheme("dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <button
      aria-label="Toggle dark mode"
      className="flex h-9 w-9 items-center justify-center rounded-lg ring-gray-300 transition-all hover:ring-2"
      onClick={handleClick}
    >
      {selectedTheme === "light" ? <DarkIcon /> : <LightIcon />}
    </button>
  );
};
