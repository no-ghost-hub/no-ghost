import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { s } from "@/utils/useString";

type Props = {};

const Component = async ({}: Props) => {
  return (
    <Link theme="button">
      <Text tag="div">{s("ctas.reserve")}</Text>
    </Link>
  );
};

export default Component;
