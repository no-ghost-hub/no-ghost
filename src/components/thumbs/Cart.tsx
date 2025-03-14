"use client";

import Text from "@/components/elements/Text";
import { CartItem } from "@/stores/cart";
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
  reward,
}: Props) => {
  const mainEl = useRef<HTMLDivElement>(null);

  const { removeAttribute } = useCartStore((state) => state);

  return (
    <div className={`grid shadow ${reward ? "bg-green" : "bg-white"}`}>
      <div
        ref={mainEl}
        className={`grid grid-flow-col items-center ${reward ? "" : "grid-cols-[auto_1fr_auto]"}`}
      >
        {!reward && (
          <div className="grid justify-items-start *:col-start-1 *:row-start-1">
            <SizeUtil name="adder" width scoped scopedEl={mainEl}>
              <CartAdder
                {...{ id, productId, price, taxedPrice, tax, title }}
              />
            </SizeUtil>
            <div className="w-(--w-price)" />
          </div>
        )}
        <div className="p-xs">
          <Text
            wrap={true}
            align="center"
            tag="h4"
            typo={reward ? "sm" : "base"}
          >
            {title}
          </Text>
        </div>
        {!reward && (
          <div className="grid justify-items-end *:col-start-1 *:row-start-1">
            <SizeUtil name="price" width scoped scopedEl={mainEl}>
              <div className="p-xs">
                <Text>{formatPrice(taxedPrice * quantity)}</Text>
              </div>
            </SizeUtil>
            <div className="w-(--w-adder)" />
          </div>
        )}
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
