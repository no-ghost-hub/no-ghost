import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { s } from "@/utils/useString";

type Props = {};

const MenuBlock = async ({}: Props) => {
  return (
    <Link href="/menu" theme="button" background="white">
      <Text tag="div">{await s("ctas.restaurantMenu")}</Text>
    </Link>
  );
};

export default MenuBlock;
