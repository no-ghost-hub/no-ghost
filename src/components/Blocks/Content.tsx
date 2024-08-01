import { FC } from "react";
import TextBlock from "@/components/Blocks/Text";
import QuotesBlock from "@/components/Blocks/Quotes";
import FooterBlock from "@/components/Blocks/Footer";
import Medium from "@/components/groups/Medium";

import parsed from "@/utils/parsed";

type Props = {
  sideMedium: any;
  blocks: any[];
};

const Component: FC<Props> = ({ sideMedium, blocks }) => {
  const components: Record<string, any> = {
    textBlock: TextBlock,
    quotesBlock: QuotesBlock,
    footerBlock: FooterBlock,
  };

  return (
    <div className="flex flex-col s:h-screen s:flex-row">
      <div className="shrink-0 basis-1/3">
        <Medium {...parsed(sideMedium, sideMedium.blockType)} theme="cover" />
      </div>
      <div className="p-xl gap-xl grid grow content-between">
        {blocks?.map((block, index) => {
          const Block = components[block.blockType];
          return <Block key={index} {...parsed(block, block.blockType)} />;
        })}
      </div>
    </div>
  );
};

export default Component;
