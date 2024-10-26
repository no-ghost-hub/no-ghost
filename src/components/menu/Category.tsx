import Text from "@/components/elements/Text";
import ProductThumb from "@/components/thumbs/Product";
import parsed from "@/utils/parsed";

type Props = {
  title: string;
  products: any[];
};

const Component = async ({ title, products }: Props) => {
  return (
    <div>
      <Text>{title}</Text>
      {products?.map((product) => {
        return (
          <ProductThumb
            key={product.id}
            {...parsed(product, "product-thumb")}
          />
        );
      })}
    </div>
  );
};

export default Component;
