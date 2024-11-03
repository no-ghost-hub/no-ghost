import Text from "@/components/elements/Text";
import ProductThumb from "@/components/thumbs/Product";
import parsed from "@/utils/parsed";

type Props = {
  title: string;
  products: any[];
};

const Component = async ({ title, products }: Props) => {
  return (
    <div className="grid gap-m">
      <Text tag="h3" align="center" transform="uppercase">
        {title}
      </Text>
      <div className="grid grid-cols-thumbs gap-xs">
        {products?.map((product) => {
          return (
            <ProductThumb
              key={product.id}
              {...parsed(product, "product-thumb")}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Component;
