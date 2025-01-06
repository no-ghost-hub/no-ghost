"use client";

import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import FormsNumber from "../forms/Number";
import { useCartStore } from "@/components/providers/Global";

type Props = {
  id: number;
  title: string;
  price: number;
  theme?: string;
};

const colors: Record<string, string> = {
  default: "orange",
  lunch: "orange",
  dinner: "blue",
};

const CartAdder = ({ id, title, price, theme = "default" }: Props) => {
  const { cart, add } = useCartStore((state) => state);
  const inCart = cart.find((item) => item.id === id);

  function handleQuantity(quantity: number) {
    console.log(quantity);
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
      onClick={() => add({ id, title, price, quantity: 1 })}
      theme="button"
      background={colors[theme]}
    >
      <Text>{s("ctas.cart.add")}</Text>
    </Link>
  );
};

export default CartAdder;
