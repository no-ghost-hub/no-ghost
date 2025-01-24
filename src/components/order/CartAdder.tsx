"use client";

import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import FormsNumber from "@/components/forms/Number";
import { useCartStore } from "@/components/providers/Global";

type Props = {
  id: number;
  title: string;
  price: number;
  taxedPrice: number;
  taxId: number;
  theme?: string;
};

const CartAdder = ({
  id,
  title,
  price,
  taxedPrice,
  taxId,
  theme = "default",
}: Props) => {
  const { cart, add, update, remove } = useCartStore((state) => state);
  const inCart = cart.find((item) => item.id === id);

  function handleQuantity(quantity: number) {
    if (quantity > 0) {
      update(id, quantity);
    } else {
      remove(id);
    }
  }

  return inCart ? (
    <FormsNumber
      min={0}
      label="Cart item quantity"
      value={inCart.quantity}
      onChange={handleQuantity}
    />
  ) : (
    <Link
      onClick={() => add({ id, title, price, taxedPrice, taxId, quantity: 1 })}
      theme="button"
      background={theme}
    >
      <Text>{s("ctas.cart.add")}</Text>
    </Link>
  );
};

export default CartAdder;
