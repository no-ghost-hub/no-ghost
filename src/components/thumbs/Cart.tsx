"use client";

import Text from "@/components/elements/Text";
import { CartItem } from "@/stores/cart";
import useCurrency from "@/utils/useCurrency";
import formatPrice from "@/utils/formatPrice";
import CartAdder from "@/components/order/CartAdder";
import SizeUtil from "@/components/utils/Size";
import { useRef } from "react";
import CartAttributeThumb from "@/components/thumbs/CartAttribute";
import { useCartStore } from "@/components/providers/Global";

type Props = CartItem & { theme?: string };

const CartThumb = ({
  id,
  productId,
  price,
  taxedPrice,
  tax,
  attributes,
  quantity,
  title,
}: Props) => {
  const mainEl = useRef<HTMLDivElement>(null);

  const { removeAttribute } = useCartStore((state) => state);

  return (
    <div className="grid bg-white shadow">
      <div
        ref={mainEl}
        className="gap-xs grid grid-flow-col grid-cols-[auto_1fr_auto] items-center"
      >
        <div className="grid justify-items-start *:col-start-1 *:row-start-1">
          <SizeUtil name="adder" width scoped scopedEl={mainEl}>
            <CartAdder {...{ id, productId, price, taxedPrice, tax, title }} />
          </SizeUtil>
          <div className="w-(--w-price)" />
        </div>
        <div className="p-xs">
          <Text wrap={true} align="center">
            {title}
          </Text>
        </div>
        <div className="grid justify-items-end *:col-start-1 *:row-start-1">
          <SizeUtil name="price" width scoped scopedEl={mainEl}>
            <div className="p-xs">
              <Text>{formatPrice(taxedPrice * quantity, useCurrency())}</Text>
            </div>
          </SizeUtil>
          <div className="w-(--w-adder)" />
        </div>
      </div>
      {attributes?.map(({ id: attributeId, name, price }) => (
        <CartAttributeThumb
          key={attributeId}
          {...{ id: attributeId, name, price, tax }}
          onRemove={() => removeAttribute(id, attributeId)}
        />
      ))}
    </div>
  );
};

export default CartThumb;
