"use client";

import Text from "@/components/elements/Text";
import formatPrice from "@/utils/formatPrice";
import SizeUtil from "@/components/utils/Size";
import FormsNumber from "@/components/forms/Number";
import { useRef } from "react";
import { s } from "@/utils/useClientString";

type Props = {
  id: number;
  name: string;
  price: number;
  tax: { id: number; amount: number };
  onRemove: (id: number) => void;
};

const CartAttributeThumb = ({ id, name, price, tax, onRemove }: Props) => {
  const el = useRef<HTMLDivElement>(null);

  return (
    <div
      className="gap-xs bg-yellow grid grid-flow-col grid-cols-[auto_1fr_auto] items-center"
      ref={el}
    >
      <div className="invisible grid justify-items-start *:col-start-1 *:row-start-1">
        <SizeUtil name="remover" width scoped scopedEl={el}>
          <FormsNumber
            value={1}
            label="Remove attribute"
            onChange={() => onRemove(id)}
            max={1}
          />
        </SizeUtil>
        <div className="w-(--w-price)" />
      </div>
      <Text align="center" typo="sm">
        {name}
      </Text>
      <div className="grid justify-items-end *:col-start-1 *:row-start-1">
        <SizeUtil name="price" width scoped scopedEl={el}>
          <div className="p-xs">
            <Text typo="sm">
              {price
                ? formatPrice(price * (1 + 12 / 100))
                : s("attribute.free")}
            </Text>
          </div>
        </SizeUtil>
        <div className="w-(--w-remover)" />
      </div>
    </div>
  );
};

export default CartAttributeThumb;
