import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { s } from "@/utils/useString";

type Props = {};

const OrderBlock = async ({}: Props) => {
  return (
    <Link
      theme="button"
      background="white"
      href={{ query: { navigation: "order" } }}
      keepQuery
      toggle
    >
      <Text tag="div">{await s("ctas.order")}</Text>
    </Link>
  );
};

export default OrderBlock;
