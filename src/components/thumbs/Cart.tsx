"use client";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { CartItem } from "@/stores/cart";
import useCurrency from "@/utils/useCurrency";
import formatPrice from "@/utils/formatPrice";
import CartAdder from "@/components/order/CartAdder";

type Props = CartItem & { theme?: string };

const CartThumb = ({ id, price, quantity, title }: Props) => {
  return (
    <div className="grid bg-white shadow *:col-start-1 *:row-start-1">
      <div className="grid place-content-center p-xs">
        <Text wrap={false} align="center">
          {title}
        </Text>
      </div>
      <div className="pointer-events-none grid grid-flow-col items-center justify-between gap-m">
        <div className="pointer-events-auto">
          <CartAdder {...{ id, price, title }} />
        </div>
        <div className="invisible">
          <Text wrap={false}>{title}</Text>
        </div>
        <div className="pointer-events-auto p-xs">
          <Text>{formatPrice(price * quantity, useCurrency())}</Text>
        </div>
      </div>
    </div>
  );
};

export default CartThumb;
