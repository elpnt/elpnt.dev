type TagBadgeProps = {
  name: string;
};

export const TagBadge = ({ name }: TagBadgeProps) => {
  return (
    <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
      {name}
    </span>
  );
};
