import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { s } from "@/utils/useString";

type Props = {};

const Component = ({}: Props) => {
  return (
    <Link href="menu" theme="button">
      <Text tag="div">{s("ctas.restaurantMenu")}</Text>
    </Link>
  );
};

export default Component;
