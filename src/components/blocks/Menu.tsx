import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { s } from "@/utils/useClientString";

type Props = {};

const MenuBlock = ({}: Props) => {
  return (
    <Link href="/menu" theme="button" background="white">
      <Text tag="div">{s("ctas.restaurantMenu")}</Text>
    </Link>
  );
};

export default MenuBlock;
