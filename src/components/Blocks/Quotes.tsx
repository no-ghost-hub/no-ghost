import { FC, Fragment } from "react";
import { Quote } from "@/payload-types";
import { QuotesBlock } from "@/types";
import QuoteThumb from "@/components/thumbs/Quote";
import Carousel from "@/components/elements/Carousel";

import getEntries from "@/utils/getEntries";

type Props = QuotesBlock;

const Component: FC<Props> = async () => {
  const quotes: Quote[] = await getEntries("Quotes");

  return (
    <Carousel>
      {quotes?.map((quote, index) => {
        return (
          <div key={index} className="swiper-slide">
            <QuoteThumb {...quote} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default Component;
