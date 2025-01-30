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
  const { cart, add, update, remove } = useCartStore((state) => state);
  const inCart = cart.find((item) => item.id === (id || `${productId}`));

  function handleQuantity(quantity: number) {
    if (quantity > 0) {
      if (inCart && attributes?.length && quantity > inCart.quantity) {
        setShow(true);
      } else {
        update(id, quantity);
      }
    } else {
      remove(id);
    }
  }

  const [show, setShow] = useState(false);

  function handleAdd() {
    if (attributes?.length) {
      setShow(true);
    } else {
      add({ productId, title, price, taxedPrice, tax, quantity: 1 });
    }
  }

  function onAdd(attributesIds: number[]) {
    const selectedAttributes = attributes
      ?.flatMap(({ options }) => options)
      .filter(({ id }) => attributesIds.includes(id));

    const alreadyAttributes = inCart?.attributes?.map(({ id }) => id) || [];
    if (
      inCart &&
      attributesIds.length === alreadyAttributes.length &&
      attributesIds.every((item) => alreadyAttributes.includes(item))
    ) {
      update(id, inCart?.quantity || 0 + 1);
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
    }
    setShow(false);
  }

  return (
    <>
      {inCart ? (
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
        </>
      )}
      {attributes?.length && (
        <Modal show={show} onShowChange={setShow} label="Product attributes">
          <ProductAttributes {...{ title, attributes, onAdd }} />
        </Modal>
      )}
    </>
  );
};

export default CartAdder;
