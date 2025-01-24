"use client";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import { CartItem } from "@/stores/cart";
import useCurrency from "@/utils/useCurrency";
import formatPrice from "@/utils/formatPrice";
import CartAdder from "@/components/order/CartAdder";
import SizeUtil from "@/components/utils/Size";

type Props = CartItem & { theme?: string };

const CartThumb = ({
  id,
  price,
  taxedPrice,
  taxId,
  quantity,
  title,
}: Props) => {
  return (
    <div className="gap-xs grid grid-flow-col grid-cols-[auto_1fr_auto] items-center bg-white shadow">
      <div className="grid justify-start *:col-start-1 *:row-start-1">
        <SizeUtil name="adder" width>
          <CartAdder {...{ id, price, taxedPrice, taxId, title }} />
        </SizeUtil>
        <div className="w-(--w-quantity)" />
      </div>
      <div className="p-xs">
        <Text wrap={true} align="center">
          {title}
        </Text>
      </div>
      <div className="grid justify-end *:col-start-1 *:row-start-1">
        <div className="p-xs grid justify-end">
          <SizeUtil name="quantity" width>
            <Text>{formatPrice(taxedPrice * quantity, useCurrency())}</Text>
          </SizeUtil>
        </div>
        <div className="w-(--w-adder)" />
      </div>
    </div>
  );
};

export default CartThumb;
