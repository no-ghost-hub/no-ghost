"use client";

import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  colors: Record<string, string>;
  children?: React.ReactNode;
};

const colorClasses: Record<string, string> = {
  default: "bg-white",
  orange: "bg-orange",
  blue: "bg-blue",
};

const stateClasses: Record<string, string> = {
  show: "transform translate-y-0",
  hide: "transform translate-y-full",
};

const MenuGroupsContainer = ({ colors, children }: Props) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const group = searchParams.get("group");

  return (
    <div
      className={`${colorClasses[colors[group || "default"]]} ${path === "/menu" ? stateClasses.show : stateClasses.hide} transition-transform`}
    >
      {children}
    </div>
  );
};

export default MenuGroupsContainer;
