import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";
import { s } from "@/utils/useClientString";
import { ToggleButton, ToggleButtonGroup } from "react-aria-components";
import { useState } from "react";
import type { Key } from "react-aria-components";
import formatPrice from "@/utils/formatPrice";
import useCurrency from "@/utils/useCurrency";
import type { ProductAttribute } from "@/types";

type ProductAttributesProps = {
  title: string;
  attributes: ProductAttribute[];
  tax: { id: number; amount: number };
  onAdd: (attributes: number[]) => void;
};

type ProductAttributeProps = ProductAttribute & {
  value: Set<Key>;
  tax: { id: number; amount: number };
  onChange: (selected: Set<Key>) => void;
};

const ProductAttributes = ({
  title,
  attributes,
  tax,
  onAdd,
}: ProductAttributesProps) => {
  const [selected, setSelected] = useState(
    attributes.reduce((acc: Record<number, Set<Key>>, attribute) => {
      acc[attribute.id] = new Set();
      return acc;
    }, {}),
  );

  const onChange = (key: number, ids: Set<Key>) => {
    setSelected((prev) => ({
      ...prev,
      [key]: ids,
    }));
  };

  function handleAdd() {
    const allAttributes = Object.values(selected)
      .map((set) => Array.from(set))
      .flat() as number[];

    onAdd(allAttributes);
  }

  return (
    <div className="grid h-[calc(100svh-var(--h-nav)-(var(--spacing-xs))*2)] grid-rows-[auto_1fr]">
      <header className="p-xs grid">
        <Text tag="h3" align="center">
          {title}
        </Text>
      </header>
      <main className="p-xs gap-m grid grid-rows-[1fr] overflow-y-auto">
        <div className="gap-s grid content-center">
          {attributes.map((attribute) => (
            <ProductAttribute
              key={attribute.id}
              {...attribute}
              tax={tax}
              value={selected[attribute.id]}
              onChange={(value) => onChange(attribute.id, value)}
            />
          ))}
        </div>
        <footer className="grid">
          <Link theme="button" background="orange" onClick={handleAdd}>
            <Text tag="div" wrap={false}>
              {s("ctas.cart.add")}
            </Text>
          </Link>
        </footer>
      </main>
    </div>
  );
};

const ProductAttribute = ({
  name,
  options,
  value,
  tax,
  onChange,
}: ProductAttributeProps) => {
  return (
    <div className="gap-xs grid">
      <Text tag="h5" align="center">
        {name}
      </Text>
      <ToggleButtonGroup
        selectionMode="multiple"
        selectedKeys={value}
        onSelectionChange={onChange}
        className="grid"
      >
        {options.map(({ id, name, price }) => (
          <ToggleButton
            key={id}
            id={id}
            className="custom-underline data-selected:bg-grey cursor-pointer"
          >
            <div className="p-xs grid grid-flow-col items-end justify-between">
              <Text tag="div" wrap={false}>
                {name}
              </Text>
              <Text tag="div" typo="sm" wrap={false}>
                {price
                  ? formatPrice(price * (1 + tax.amount / 100), useCurrency())
                  : s("attribute.free")}
              </Text>
            </div>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default ProductAttributes;
