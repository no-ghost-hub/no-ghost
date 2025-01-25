import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";
import { s } from "@/utils/useClientString";
import { ToggleButton, ToggleButtonGroup } from "react-aria-components";
import { useState } from "react";
import type { Key } from "react-aria-components";
import formatPrice from "@/utils/formatPrice";
import useCurrency from "@/utils/useCurrency";

type ProductAttributesProps = {
  title: string;
  attributes: any[];
  onAdd: (attributes: number[]) => void;
};

type ProductAttributeProps = {
  id: number;
  name: string;
  options: any[];
  value: Key[];
  onChange: (selected: Set<Key>) => void;
};

const ProductAttributes = ({
  title,
  attributes,
  onAdd,
}: ProductAttributesProps) => {
  const [selected, setSelected] = useState<Record<string, Set<Key>>>(
    attributes.reduce((acc, attribute) => {
      acc[attribute.id] = new Set();
      return acc;
    }, {}),
  );

  const onChange = (key: string, ids: Set<Key>) => {
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
      <main className="p-xs gap-m grid overflow-y-auto">
        <div className="gap-s grid content-center">
          {attributes.map((attribute) => (
            <ProductAttribute
              key={attribute.id}
              {...attribute}
              value={selected[attribute.id]}
              onChange={(value) => onChange(attribute.id, value)}
            />
          ))}
        </div>
        <footer className="grid">
          <Link theme="button" background="orange" onClick={handleAdd}>
            <Text tag="div" wrap={false}>
              <Text tag="div">{s("ctas.cart.add")}</Text>
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
        {options.map(({ id, name, price_extra }) => (
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
                {price_extra
                  ? formatPrice(price_extra, useCurrency())
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
