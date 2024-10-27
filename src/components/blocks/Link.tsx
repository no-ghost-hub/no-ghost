import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";

type Props = {
  href: string;
  text: string;
};

const Component = ({ href, text }: Props) => {
  return (
    <Link href={href} theme="button">
      <Text tag="div">{text}</Text>
    </Link>
  );
};

export default Component;
