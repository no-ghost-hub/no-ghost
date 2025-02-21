import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";
import Accordion from "@/components/elements/Accordion";
import { s } from "@/utils/useClientString";
import { ToggleButton, ToggleButtonGroup } from "react-aria-components";
import { useState } from "react";
import type { Key } from "react-aria-components";
import formatPrice from "@/utils/formatPrice";
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

  const valid = attributes
    .filter((a) => a.type === "radio")
    .every((a) => selected[a.id].size);

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
      <main className="gap-m grid grid-rows-[1fr] overflow-y-auto">
        <div className="gap-s p-xs grid content-center">
          {attributes.map(({ id, name, muted, options, type }) => (
            <ProductAttributeWrapper key={id} name={name} muted={muted}>
              <ProductAttribute
                {...{ id, name, muted, options, tax, type }}
                value={selected[id]}
                onChange={(value) => onChange(id, value)}
              />
            </ProductAttributeWrapper>
          ))}
        </div>
        <footer className="p-xs sticky bottom-0 grid bg-white">
          <Link
            theme="button"
            background="orange"
            onClick={handleAdd}
            disabled={!valid}
          >
            <Text tag="div" wrap={false}>
              {s("ctas.cart.add")}
            </Text>
          </Link>
        </footer>
      </main>
    </div>
  );
};

const ProductAttributeWrapper = ({
  name,
  muted,
  children,
}: {
  name: string;
  muted: boolean;
  children: React.ReactNode;
}) =>
  muted ? (
    <Accordion
      trigger={
        <Text tag="h5" align="center">
          {name}
        </Text>
      }
    >
      {children}
    </Accordion>
  ) : (
    <div>
      <div className="p-xs">
        <Text tag="h5" align="center">
          {name}
        </Text>
      </div>
      {children}
    </div>
  );

const ProductAttribute = ({
  options,
  type,
  value,
  tax,
  onChange,
}: ProductAttributeProps) => {
  return (
    <ToggleButtonGroup
      selectionMode={type === "radio" ? "single" : "multiple"}
      selectedKeys={value}
      onSelectionChange={onChange}
      className="grid"
      disallowEmptySelection={type === "radio"}
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
              {price ? (
                formatPrice(price * (1 + tax.amount / 100))
              ) : (
                <>&nbsp;</>
              )}
            </Text>
          </div>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ProductAttributes;
