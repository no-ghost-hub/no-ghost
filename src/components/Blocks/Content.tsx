import { FC } from "react";
import TextBlock from "@/components/Blocks/Text";
import QuotesBlock from "@/components/Blocks/Quotes";
import FooterBlock from "@/components/Blocks/Footer";

import type { ContentBlock, ContentBlockBlocks } from "@/types";

type Props = Omit<ContentBlock, "blocks"> & { blocks: ContentBlockBlocks };

const Component: FC<Props> = ({ medium, blocks }) => {
  const components = new Map<string, FC<any>>([
    ["textBlock", TextBlock],
    ["quotesBlock", QuotesBlock],
    ["footerBlock", FooterBlock],
  ]);

  return (
    <div className="flex flex-col p-s s:h-screen s:flex-row">
      <div className="shrink-0 basis-1/3">sidebar</div>
      <div className="grid grow">
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
