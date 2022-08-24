type Props = {
  date: string; // yyyy-MM-dd
};

export const DateFormatter = ({ date }: Props) => {
  return (
    <time dateTime={date}>
      {Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(
        new Date(date)
      )}
    </time>
  );
};
