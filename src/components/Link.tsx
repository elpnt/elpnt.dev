import NextLink from "next/link";

type LinkProps = React.ComponentProps<"a"> & {
  href: string;
  children: React.ReactNode;
};

export const Link = ({ href, children, ...props }: LinkProps) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};
