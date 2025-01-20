"use client";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { s } from "@/utils/useClientString";
import { useUiStore } from "@/components/providers/Global";

type Props = {
  onClick: (s: string) => void;
};

const OrderBlock = ({ onClick }: Props) => {
  const { navigation } = useUiStore((state) => state);
  return (
    <Link
      theme="button"
      background="white"
      onClick={() => onClick("order")}
      active={navigation === "order"}
    >
      <Text tag="div">{s("ctas.order")}</Text>
    </Link>
  );
};

export default OrderBlock;
