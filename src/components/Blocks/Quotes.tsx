import { FC } from "react";
import QuoteThumb from "@/components/thumbs/Quote";
import Carousel from "@/components/elements/Carousel";

import type { Quote } from "@/payload-types";
import type { QuotesBlock } from "@/types";

import getEntries from "@/utils/getEntries";

type Props = QuotesBlock;

const Component: FC<Props> = async (props) => {
  console.log(props);

  // const data: Quote[] = await getEntries("Quotes");

  return (
    <div></div>
    // <Carousel>
    //   {data?.map((quote, index) => {
    //     return (
    //       <div key={index} className="swiper-slide">
    //         <QuoteThumb {...quote} />
    //       </div>
    //     );
    //   })}
    // </Carousel>
  );
};

export default Component;
