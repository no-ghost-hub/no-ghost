import QuoteThumb from "@/components/thumbs/Quote";
import Carousel from "@/components/elements/Carousel";

import type { Quote } from "@/payload-types";

import getEntries from "@/utils/getEntries";
import parsed from "@/utils/parsed";

type Props = {
  slugs: string[];
};

const Component: React.FC<Props> = async ({ slugs }) => {
  const data: Quote[] = await getEntries("Quotes", slugs);

  return (
    <Carousel theme="quotes">
      {data?.map((quote, index) => {
        return (
          <div key={index} className="swiper-slide">
            <QuoteThumb {...parsed(quote, "quoteThumb")} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default Component;
