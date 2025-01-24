"use client";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { s } from "@/utils/useClientString";
import { useUiStore } from "@/components/providers/Global";

type Props = {
  onClick: (s: string) => void;
};

const ReserveBlock = ({ onClick }: Props) => {
  const { navigation } = useUiStore((state) => state);
  return (
    <Link
      theme="button"
      background="white"
      onClick={() => onClick("reserve")}
      active={navigation === "reserve"}
      shadow={false}
    >
      <Text tag="div">{s("ctas.reserve")}</Text>
    </Link>
  );
};

export default ReserveBlock;
