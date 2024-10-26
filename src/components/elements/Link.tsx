import Link from "next/link";

import type { Link as LinkType } from "@/types";

type Props = LinkType;

const Component = ({ href, children }: Props) => {
  return <Link href={href}>{children}</Link>;
};

export default Component;
