import Text from "@/components/elements/Text";
import Image from "@/components/elements/Image";
import formatPrice from "@/utils/formatPrice";
import useOdoo from "@/utils/useOdoo";

type Props = {
  title: string;
  image?: string;
  description?: string;
  price: number;
};

const ProductThumb = async ({ title, image, description, price }: Props) => {
  const { data } = await useOdoo({ route: "company" });

  const formattedPrice = formatPrice(price, data.currency);

  return (
    <div className="grid grid-rows-[auto_minmax(0,1fr)] bg-white">
      <div className="relative grid aspect-[1/1]">
        <Image src={image} alt={title} theme="thumb" />
      </div>
      <div className="grid aspect-[1/1] content-between gap-s p-s">
        <div className="grid gap-s">
          <Text tag="h2" typo="2" align="center">
            {title}
          </Text>
          <Text align="center" html={description} />
        </div>
        <Text tag="h5" align="center">
          {formattedPrice}
        </Text>
      </div>
    </div>
  );
};

export default ProductThumb;
