import { FC } from "react";
import ContentBlock from "@/components/Blocks/Content";
import parsed from "@/utils/parsed";

import type { Page as PageType } from "@/payload-types";

type Props = { blocks: PageType["blocks"] };

const Blocks: FC<Props> = ({ blocks }) => {
  const components = {
    contentBlock: ContentBlock,
  };

  return (
    <div>
      {blocks?.map((block, index) => {
        const Component = components[block.blockType];
        return <Component key={index} {...parsed(block, block.blockType)} />;
      })}
    </div>
  );
};

export default Blocks;
