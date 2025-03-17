import getPromotion from "@/odoo/getPromotion";
import Text from "@/components/elements/Text";
import PromotionBlockClient from "./Promotion.client";
import { s } from "@/utils/useString";

type Props = {
  code: string;
  theme?: string;
  background?: string;
};

const classes: Record<string, string> = {
  default: "",
  orange: "bg-orange",
  blue: "bg-blue",
  none: "",
};

const PromotionBlock = async ({ code, background = "default" }: Props) => {
  const { data } = await getPromotion(code);

  return (
    <div className={`grid ${classes[background]} px-xs py-l gap-m`}>
      <div className="gap-s grid">
        <Text typo="lg">
          {data.maxUsage - data.count}/{data.maxUsage}
        </Text>
        <Text align="center">{s("promotion.remaining")}</Text>
      </div>
      <div className="gap-s grid justify-self-center">
        <Text align="center">{s("promotion.discountCode")}</Text>
        <PromotionBlockClient code={code} />
      </div>
    </div>
  );
};

export default PromotionBlock;
