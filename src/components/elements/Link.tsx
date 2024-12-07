"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { LinkProps } from "next/link";

type Props = Omit<LinkProps, "href"> & {
  href?: LinkProps["href"];
  children: React.ReactNode;
  background?: string;
  toggle?: boolean;
  theme?: string;
};

const classes: Record<string, string> = {
  default: "",
  button: "p-xs mix-blend-multiply text-center",
};

const backgrounds: Record<string, string> = {
  default: "",
  white: "bg-white",
  orange: "bg-orange",
  blue: "bg-blue",
};

const LinkElement = ({
  href,
  children,
  background = "default",
  toggle = false,
  theme = "default",
}: Props) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const fullPath = query ? `${path}?${query}` : path;
  const external = href?.toString().startsWith("http");

  const active =
    typeof href === "string"
      ? path === href || fullPath === href
      : href
        ? Object.entries(href.query || {}).every(
            ([key, value]) => searchParams.get(key) === value,
          )
        : false;

  return (
    <>
      {href ? (
        <Link
          href={toggle && active ? path : href}
          className={`custom-underline ${classes[theme]} ${backgrounds[background]} ${active ? "active-link" : ""}`}
          target={external ? "_blank" : undefined}
        >
          {children}
        </Link>
      ) : (
        <button
          className={`custom-underline ${classes[theme]} ${backgrounds[background]}`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default LinkElement;
