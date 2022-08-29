import clsx from "clsx";

import { Link } from "./Link";

type TagBadgeProps = {
  name: string;
  slug: string;
};

export const TagBadge = ({ name, slug }: TagBadgeProps) => {
  return (
    <Link
      href={`/tags/${slug}`}
      className={clsx(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium sm:text-sm",
        "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900",
        "dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
      )}
    >
      {name}
    </Link>
  );
};
