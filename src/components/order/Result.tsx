"use client";

import Text from "@/components/elements/Text";

import { s } from "@/utils/useClientString";
import { Order } from "@/types";

type Props = {
  order?: Order;
  error?: string;
  payment?: boolean;
};

const OrderResult = ({ order, error, payment }: Props) => {
  return (
    <main className="gap-s p-xs grid grid-rows-[1fr] overflow-y-auto">
      <div className="gap-s grid self-center">
        <Text
          tag="h2"
          typo="base"
          align="center"
          color={error ? "orange" : "black"}
        >
          {s(
            error
              ? "order.error"
              : payment
                ? "order.payment.success"
                : "order.success",
          )}
        </Text>
        {error ? (
          <Text typo="sm" align="center">
            {error}
          </Text>
        ) : (
          order && (
            <Text align="center">
              {order.lines.map(({ id, title, quantity }) => (
                <span key={id}>
                  <span className="text-orange"> {quantity}</span> {title}
                  <br />
                </span>
              ))}
            </Text>
          )
        )}
      </div>
      {/* <Link
        theme="button"
        background="orange"
        onClick={() => setNavigation("")}
        active={false}
      >
        <Text tag="div">{s("ctas.close")}</Text>
      </Link> */}
    </main>
  );
};

export default OrderResult;
