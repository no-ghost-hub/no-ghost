"use client";

import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import { Order } from "@/types";
import { useUiStore } from "@/components/providers/Global";

type Props = {
  order?: Order;
  error?: string;
};

const OrderResult = ({ order, error }: Props) => {
  const { setNavigation } = useUiStore((state) => state);
  return (
    <main className="gap-s p-xs grid grid-rows-[1fr] overflow-y-auto">
      <div className="gap-s grid self-center">
        <Text
          tag="h2"
          typo="base"
          align="center"
          color={error ? "orange" : "black"}
        >
          {s(error ? "order.error" : "order.success")}
        </Text>
        {error ? (
          <Text typo="sm" align="center">
            {error}
          </Text>
        ) : (
          order && (
            <Text typo="sm" align="center">
              {order.lines.map(({ title, quantity }) => (
                <>
                  {quantity}x {title}
                  <br />
                </>
              ))}
            </Text>
          )
        )}
      </div>
      <Link
        theme="button"
        background="orange"
        onClick={() => setNavigation("")}
        active={false}
      >
        <Text tag="div">{s("ctas.close")}</Text>
      </Link>
    </main>
  );
};

export default OrderResult;
