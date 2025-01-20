"use client";

import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { totalQuantity, totalPrice } from "@/stores/cart";
import { s } from "@/utils/useClientString";

type Props = {};

const OrderBar = ({}: Props) => {
  return (
    <div className="grid">
      <nav className="grid grid-flow-col items-center justify-between bg-white">
        <Text>{totalQuantity()}</Text>
        <Link theme="button">
          <Text wrap={false}>{s("ctas.cart")}</Text>
        </Link>
        <Text>{totalPrice()}</Text>
      </nav>
    </div>
  );
};

export default OrderBar;
