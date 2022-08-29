import NextLink from "next/link";

import type { LinkProps as NextLinkProps } from "next/link";

type LinkProps = NextLinkProps & {
  children: React.ReactNode;
  className?: string;
};

export const Link = (props: LinkProps) => {
  const { href, children, className, ...restProps } = props;

  return (
    <NextLink href={href} {...restProps}>
      <a className={className}>{children}</a>
    </NextLink>
  );
};
