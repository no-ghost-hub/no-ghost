import Text from "@/components/elements/Text";
import Image from "@/components/elements/Image";
import getSettings from "@/utils/getSettings";
import formatPrice from "@/utils/formatPrice";

type Props = {
  title: string;
  image?: string;
  description?: string;
  price: number;
};

const Component = async ({ title, image, description, price }: Props) => {
  const { currency } = await getSettings();
  const formattedPrice = formatPrice(price, currency);

  return (
    <div className="grid grid-rows-[auto_minmax(0,1fr)] bg-white">
      <div className="relative aspect-[1/1]">
        <Image src={image} alt={title} theme="thumb" />
      </div>
      <div className="grid aspect-[1/1] content-between gap-s p-s">
        <div className="grid gap-s">
          <Text tag="h2" typo="2" align="center">
            {title}
          </Text>
          <Text align="center">{description}</Text>
        </div>
        <Text tag="h5" align="center">
          {formattedPrice}
        </Text>
      </div>
    </div>
  );
};

export default Component;
