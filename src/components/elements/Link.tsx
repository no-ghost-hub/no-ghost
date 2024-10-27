import Link from "next/link";
import type { LinkProps } from "next/link";

type Props = LinkProps & { children: React.ReactNode; theme?: string };

const Component = ({ href, children, theme = "default" }: Props) => {
  const classes: Record<string, string> = {
    default: "",
    button: "bg-white p-xs",
  };

  return (
    <Link href={href} className={classes[theme]}>
      {children}
    </Link>
  );
};

export default Component;
