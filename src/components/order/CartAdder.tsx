"use client";

import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import FormsNumber from "@/components/forms/Number";
import { useCartStore } from "@/components/providers/Global";
import { useState } from "react";
import Modal from "@/components/modals/Modal";
import ProductAttributes from "@/components/order/ProductAttributes";

type Props = {
  id: number;
  title: string;
  price: number;
  taxedPrice: number;
  taxId: number;
  attributes: any[];
  theme?: string;
};

const CartAdder = ({
  id,
  title,
  price,
  taxedPrice,
  taxId,
  attributes,
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

  const [show, setShow] = useState(false);

  function handleAdd() {
    if (attributes.length > 0) {
      setShow(true);
    } else {
      add({ id, title, price, taxedPrice, taxId, quantity: 1 });
    }
  }

  function onAdd(attributes: number[]) {
    add({ id, title, price, taxedPrice, taxId, attributes, quantity: 1 });
    setShow(false);
  }

  return inCart ? (
    <FormsNumber
      min={0}
      label="Cart item quantity"
      value={inCart.quantity}
      onChange={handleQuantity}
    />
  ) : (
    <>
      <Link onClick={handleAdd} theme="button" background={theme}>
        <Text tag="div">{s("ctas.cart.add")}</Text>
      </Link>
      {attributes.length > 0 && (
        <Modal show={show} onShowChange={setShow} label="Product attributes">
          <ProductAttributes {...{ id, title, attributes, onAdd }} />
        </Modal>
      )}
    </>
  );
};

export default CartAdder;
