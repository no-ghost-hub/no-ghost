import Text from "@/components/elements/Text";
import Image from "@/components/elements/Image";
import CartAdder from "@/components/order/CartAdder";

import formatPrice from "@/utils/formatPrice";
import useOdoo from "@/utils/useOdoo";

type Props = {
  id: number;
  title: string;
  image?: string;
  description?: string;
  price: number;
  taxedPrice: number;
  tax: { id: number; amount: number };
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
  tax,
  color = "orange",
  theme = "default",
}: Props) => {
  const { data: companyData } = await useOdoo({ route: "company" });
  const formattedPrice = formatPrice(taxedPrice, companyData.currency);

  const attributes = [];
  if (theme === "order") {
    const { data: attributesData } = await useOdoo({
      route: `product-attributes?id=${id}`,
    });

    attributes.push(...attributesData);
  }

  return (
    <div className="grid grid-rows-[auto_minmax(0,1fr)] bg-white shadow">
      {image && (
        <div className="relative grid aspect-1/1">
          <Image src={image} alt={title} theme="thumb" />
        </div>
      )}
      <div className="gap-s p-s grid aspect-1/1 content-between">
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
