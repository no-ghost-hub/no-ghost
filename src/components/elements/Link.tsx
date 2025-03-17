"use client";

import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { LinkProps } from "next/link";
import { Button } from "react-aria-components";

type Props = Omit<LinkProps, "href"> & {
  href?: LinkProps["href"];
  children: React.ReactNode;
  background?: string;
  toggle?: boolean;
  keepQuery?: boolean;
  disabled?: boolean;
  active?: boolean;
  shadow?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  theme?: string;
};

const classes: Record<string, string> = {
  default: "",
  button:
    "p-xs mix-blend-multiply text-center disabled:pointer-events-none disabled:bg-grey disabled:text-darkgrey shadow disabled:shadow-none",
  "bleed-button":
    "mix-blend-multiply text-center disabled:pointer-events-none disabled:bg-grey disabled:text-darkgrey shadow disabled:shadow-none",
};

const backgrounds: Record<string, string> = {
  default: "",
  white: "bg-white",
  orange: "bg-orange",
  blue: "bg-blue",
  green: "bg-green",
};

const Link = ({
  href: hrefProp,
  children,
  background = "default",
  shadow = true,
  toggle = false,
  keepQuery = false,
  disabled = false,
  active: activeProp,
  onClick,
  type = "button",
  theme = "default",
}: Props) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const fullPath = query ? `${path}?${query}` : path;
  const external = hrefProp?.toString().startsWith("http");

  const active =
    typeof activeProp === "boolean"
      ? activeProp
      : typeof hrefProp === "string"
        ? path === hrefProp || fullPath === hrefProp
        : hrefProp
          ? Object.entries(hrefProp.query || {}).every(
              ([key, value]) => searchParams.get(key) === value,
            )
          : false;

  const href =
    keepQuery &&
    hrefProp &&
    typeof hrefProp === "object" &&
    typeof hrefProp.query === "object"
      ? {
          query: {
            ...Object.fromEntries(searchParams.entries()),
            ...hrefProp.query,
          },
        }
      : hrefProp;

  return (
    <>
      {href ? (
        <NextLink
          href={toggle && active ? path : href}
          className={`custom-underline ${classes[theme]} ${shadow === false ? "shadow-none" : ""} ${backgrounds[background]} ${active ? "active-link" : ""}`}
          target={external ? "_blank" : undefined}
        >
          {children}
        </NextLink>
      ) : (
        <Button
          className={`custom-underline ${classes[theme]} ${shadow === false ? "shadow-none" : ""} ${backgrounds[background]} ${active ? "active-link" : ""} `}
          isDisabled={disabled}
          onPress={onClick}
          type={type}
        >
          {children}
        </Button>
      )}
    </>
  );
};

export default Link;
