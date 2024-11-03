import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";

type Props = {
  href: string;
  text: string;
};

const LinkBlock = ({ href, text }: Props) => {
  return (
    <Link href={href} theme="button" background="white">
      <Text tag="div">{text}</Text>
    </Link>
  );
};

export default LinkBlock;
