import Text from "@/components/elements/Text";
import Image from "@/components/elements/Image";
import CartAdder from "@/components/order/CartAdder";
import Wrapper from "@/components/utils/Wrapper";

import formatPrice from "@/utils/formatPrice";
import useOdoo from "@/utils/useOdoo";
import getGlobal from "@/utils/getGlobal";

type Props = {
  id: number;
  title: string;
  image?: string;
  description?: string;
  price: number;
  theme?: string;
};

const ProductThumb = async ({
  id,
  title,
  image,
  description,
  price,
  theme = "default",
}: Props) => {
  const { data } = await useOdoo({ route: "company" });
  const { strings } = await getGlobal("strings");

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
      {(theme === "lunch" || theme === "dinner") && (
        <div className="grid p-xs pt-0">
          <Wrapper context={{ strings }}>
            <CartAdder {...{ id, title, price }} theme={theme} />
          </Wrapper>
        </div>
      )}
    </div>
  );
};

export default ProductThumb;
