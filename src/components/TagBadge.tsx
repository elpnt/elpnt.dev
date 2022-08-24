import Link from "next/link";

type TagBadgeProps = {
  name: string;
  slug: string;
};

export const TagBadge = ({ name, slug }: TagBadgeProps) => {
  return (
    <Link href={`/tags/${slug}`}>
      <a className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200 hover:text-gray-900 sm:text-sm">
        {name}
      </a>
    </Link>
  );
};
