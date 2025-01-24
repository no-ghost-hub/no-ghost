import Text from "@/components/elements/Text";
import ProductThumb from "@/components/thumbs/Product";
import SizeUtil from "@/components/utils/Size";
import parsed from "@/utils/parsed";

type Props = {
  title: string;
  products: any[];
  menu?: string;
  theme?: string;
};

const colors: Record<string, string> = {
  default: "orange",
  lunch: "orange",
  dinner: "blue",
  menu: "orange",
};

const MenuCategory = async ({
  title,
  products,
  menu = "default",
  theme = "default",
}: Props) => {
  return (
    <div className="mx-auto max-w-(--breakpoint-lg) px-[calc(var(--spacing-xs)/2)]">
      <SizeUtil name="menu-category" width scoped>
        <div className="gap-m grid">
          <Text tag="h3" align="center" transform="uppercase">
            {title}
          </Text>
          <div className="gap-y-xs flex flex-wrap justify-center">
            {[...products]?.map((product) => {
              return (
                <div
                  key={product.id}
                  className="w-(--w-item) px-[calc(var(--spacing-xs)/2)]"
                >
                  <ProductThumb
                    {...parsed(product, "productThumb")}
                    theme={theme}
                    color={colors[menu]}
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
