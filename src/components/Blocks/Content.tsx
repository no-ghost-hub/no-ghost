import TextBlock from "@/components/Blocks/Text";
import QuotesBlock from "@/components/Blocks/Quotes";
import FooterBlock from "@/components/Blocks/Footer";
import Medium from "@/components/groups/Medium";

import parsed from "@/utils/parsed";

type Props = {
  sideMedium: any;
  blocks: any[];
};

const Component: React.FC<Props> = ({ sideMedium, blocks }) => {
  const components: Record<string, any> = {
    textBlock: TextBlock,
    quotesBlock: QuotesBlock,
    footerBlock: FooterBlock,
  };

  const padx: Record<string, string> = {
    textBlock: "px-pagex",
    quotesBlock: "px-0",
    footerBlock: "px-pagex",
  };

  return (
    <div className="flex-col s:flex s:h-screen s:flex-row">
      <div className="h-[75vh] shrink-0 basis-1/3 s:h-auto">
        <Medium {...parsed(sideMedium, sideMedium.blockType)} theme="cover" />
      </div>
      <div className="relative z-[1] -mt-m grid overflow-y-auto rounded-t-container bg-white s:-ml-m s:-mt-0 s:rounded-l-container">
        <div className="grid grow content-between gap-xl py-pagey">
          {blocks?.map((block, index) => {
            const Block = components[block.blockType];
            return (
              <div className={`grid ${padx[block.blockType]}`}>
                <Block key={index} {...parsed(block, block.blockType)} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Component;
