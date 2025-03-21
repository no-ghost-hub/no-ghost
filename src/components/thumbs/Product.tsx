import Text from "@/components/elements/Text";
import Image from "@/components/elements/Image";
import CartAdder from "@/components/order/CartAdder";

import formatPrice from "@/utils/formatPrice";

type Props = {
  id: number;
  title: string;
  image?: string;
  description?: string;
  price: number;
  taxedPrice: number;
  tax: { id: number; amount: number };
  attributes: any[];
  color?: string;
  theme?: string;
};

const ProductThumb = async ({
  id,
  title,
  image,
  description,
  price,
  taxedPrice,
  attributes,
  tax,
  color = "orange",
  theme = "default",
}: Props) => {
  const formattedPrice = formatPrice(taxedPrice);

  return (
    <div className="grid bg-white shadow">
      {image && (
        <div className="relative grid aspect-square w-full">
          <Image src={image} alt={title} theme="thumb" />
        </div>
      )}
      <div className="gap-s p-s grid aspect-square min-w-0 content-between">
        <div className="gap-s grid">
          <Text tag="h2" typo="md" align="center">
            {title}
          </Text>
          <Text align="center" html={description} />
        </div>
        <Text tag="h5" align="center">
          {formattedPrice}
        </Text>
      </div>
      {theme === "order" && (
        <div className="p-xs grid pt-0">
          <CartAdder
            {...{ productId: id, title, price, taxedPrice, tax, attributes }}
            theme={color}
          />
        </div>
      )}
    </div>
  );
};

export default ProductThumb;
