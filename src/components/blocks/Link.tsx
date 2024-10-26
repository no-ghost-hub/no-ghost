import Link from "@/components/elements/Link";

type Props = {
  href: string;
  text: string;
};

const Component = ({ href, text }: Props) => {
  return <Link href={href}>{text}</Link>;
};

export default Component;
