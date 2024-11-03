import LogoBlock from "@/components/blocks/Logo";
import ContentBlock from "@/components/blocks/Content";
import parsed from "@/utils/parsed";

import type { Page } from "@/payload-types";

type Props = { blocks: Page["blocks"] };

const components: Record<string, any> = {
  logoBlock: LogoBlock,
  contentBlock: ContentBlock,
};

const Component = ({ blocks }: Props) => {
  return (
    <div>
      {blocks?.map((block, index) => {
        const Block = components[block.blockType];
        return <Block key={index} {...parsed(block, block.blockType)} />;
      })}
    </div>
  );
};

export default Component;
