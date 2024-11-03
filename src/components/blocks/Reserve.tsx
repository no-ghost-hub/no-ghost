import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { s } from "@/utils/useString";

type Props = {};

const ReserveBlock = async ({}: Props) => {
  return (
    <Link theme="button" background="white">
      <Text tag="div">{await s("ctas.reserve")}</Text>
    </Link>
  );
};

export default ReserveBlock;
