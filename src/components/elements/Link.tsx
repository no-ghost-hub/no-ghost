"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LinkProps } from "next/link";

type Props = Omit<LinkProps, "href"> & {
  href?: string;
  children: React.ReactNode;
  theme?: string;
};

const Component = ({ href, children, theme = "default" }: Props) => {
  const path = usePathname();

  const classes: Record<string, string> = {
    default: "",
    button: "bg-white p-xs mix-blend-multiply",
  };

  return (
    <>
      {href ? (
        <Link
          href={href}
          className={`${classes[theme]} ${path === href ? "active-link" : ""}`}
        >
          {children}
        </Link>
      ) : (
        <button className={classes[theme]}>{children}</button>
      )}
    </>
  );
};

export default Component;
