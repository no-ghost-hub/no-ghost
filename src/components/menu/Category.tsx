import Text from "@/components/elements/Text";
import ProductThumb from "@/components/thumbs/Product";
import SizeUtil from "@/components/utils/Size";
import parsed from "@/utils/parsed";

type Props = {
  title: string;
  products: any[];
  theme?: string;
};

const productColors: Record<string, string> = {
  default: "orange",
  lunch: "orange",
  dinner: "blue",
  menu: "orange",
};

const MenuCategory = async ({ title, products, theme = "default" }: Props) => {
  return (
    <div className="mx-auto max-w-(--breakpoint-lg) px-[calc(var(--spacing-xs)/2)]">
      <SizeUtil name="menu-category" width scoped>
        <div className={`grid gap-m`}>
          <Text tag="h3" align="center" transform="uppercase">
            {title}
          </Text>
          <div className="flex flex-wrap justify-center gap-y-m">
            {[...products]?.map((product) => {
              return (
                <div
                  key={product.id}
                  className="w-[var(--w-item)] px-[calc(var(--spacing-xs)/2)]"
                >
                  <ProductThumb
                    {...parsed(product, "productThumb")}
                    theme="order"
                    color={productColors[theme]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </SizeUtil>
    </div>
  );
};

export default MenuCategory;
