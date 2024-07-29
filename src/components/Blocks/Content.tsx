import { FC } from "react";
import TextBlock from "@/components/Blocks/Text";
import QuotesBlock from "@/components/Blocks/Quotes";
import FooterBlock from "@/components/Blocks/Footer";

import type { ContentBlock, ContentBlockBlocks } from "@/types";

type Props = Omit<ContentBlock, "blocks"> & { blocks: ContentBlockBlocks };

const Component: FC<Props> = ({ medium, blocks }) => {
  console.log(blocks);
  const components = new Map([
    ["textBlock", TextBlock],
    ["quotesBlock", QuotesBlock],
    ["footerBlock", FooterBlock],
  ]);

  return (
    <div className="s:flex-row s:h-screen flex flex-col">
      <div className="basis-1/3">sidebar</div>
      <div className="grow">
        {blocks?.map((block, index) => {
          const Block = components.get(block.type);
          if (!Block) {
            return null;
          }
          return <Block key={index} {...block} />;
        })}
      </div>
    </div>
  );
};

export default Component;
