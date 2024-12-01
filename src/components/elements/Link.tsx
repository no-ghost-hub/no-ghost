"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { LinkProps } from "next/link";

type Props = Omit<LinkProps, "href"> & {
  href?: string;
  children: React.ReactNode;
  background?: string;
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
  theme = "default",
  background = "default",
}: Props) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const fullPath = query ? `${path}?${query}` : path;

  return (
    <>
      {href ? (
        <Link
          href={href}
          className={`custom-underline ${classes[theme]} ${backgrounds[background]} ${path === href || fullPath === href ? "active-link" : ""}`}
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
