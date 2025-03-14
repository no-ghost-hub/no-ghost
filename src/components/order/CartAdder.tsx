"use client";

import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import FormsNumber from "@/components/forms/Number";
import { useCartStore } from "@/components/providers/Global";
import { useState } from "react";
import Modal from "@/components/modals/Modal";
import ProductAttributes from "@/components/order/ProductAttributes";
import { ProductAttribute } from "@/types";
import { productQuantity } from "@/stores/cart";

type Props = {
  id?: string;
  productId: number;
  title: string;
  price: number;
  taxedPrice: number;
  tax: { id: number; amount: number };
  attributes?: ProductAttribute[];
  theme?: string;
};

const CartAdder = ({
  id = "",
  productId,
  title,
  price,
  taxedPrice,
  tax,
  attributes,
  theme = "default",
}: Props) => {
  const { cart, add, update, applyDiscount } = useCartStore((state) => state);

  const inCart = cart.find((item) =>
    id ? item.id === id : item.productId === productId,
  );

  const currentQuantity = id
    ? inCart?.quantity || 0
    : productQuantity(productId);

  function handleQuantity(quantity: number) {
    if (attributes?.length && !id) {
      if (quantity > currentQuantity) {
        setShow(true);
      } else {
        const lastAdded = cart.findLast((item) => item.productId === productId);
        if (lastAdded) {
          update(lastAdded.id, lastAdded.quantity - 1);
        }
      }
    } else {
      if (inCart) {
        update(inCart.id, quantity);
      }
    }
  }

  const [show, setShow] = useState(false);

  function handleAdd() {
    if (attributes?.length) {
      setShow(true);
    } else {
      add({ productId, title, price, taxedPrice, tax, quantity: 1 });
      applyDiscount();
    }
  }

  function onAdd(attributesIds: number[]) {
    const selectedAttributes = attributes
      ?.flatMap(({ options }) => options)
      .filter(({ id }) => attributesIds.includes(id));

    const already = cart.find(
      (item) =>
        item.productId === productId &&
        item.attributes?.length === attributesIds.length &&
        attributesIds.every((id) =>
          item.attributes?.some((attr) => attr.id === id),
        ),
    );

    if (already) {
      update(already.id, already.quantity + 1);
    } else {
      add({
        productId,
        title,
        price,
        taxedPrice,
        tax,
        attributes: selectedAttributes,
        quantity: 1,
      });
      applyDiscount();
    }
    setShow(false);
  }

  return (
    <>
      {currentQuantity ? (
        <FormsNumber
          min={0}
          label="Cart item quantity"
          value={currentQuantity}
          onChange={handleQuantity}
        />
      ) : (
        <Link onClick={handleAdd} theme="button" background={theme}>
          <Text tag="div">{s("ctas.cart.add")}</Text>
        </Link>
      )}
      {attributes && attributes.length > 0 && (
        <Modal show={show} onShowChange={setShow} label="Product attributes">
          <ProductAttributes {...{ title, attributes, tax, onAdd }} />
        </Modal>
      )}
    </>
  );
};

export default CartAdder;
