import Link from "next/link";

import type { Link as LinkType } from "@/types";

type Props = LinkType;

const Component: React.FC<Props> = ({ href, children }) => {
  return (
    <Link href={href} target="_blank" className="hover:text-purple">
      {children}
    </Link>
  );
};

export default Component;
