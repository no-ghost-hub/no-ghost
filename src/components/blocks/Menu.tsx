import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import getString from "@/utils/getString";

type Props = {
  text: string;
};

const Component = async ({ text }: Props) => {
  const menuString = await getString("ctas.restaurantMenu");

  return (
    <Link href="menu" theme="button">
      <Text tag="div">{menuString}</Text>
    </Link>
  );
};

export default Component;
