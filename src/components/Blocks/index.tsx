import { FC } from "react";
import ContentBlock from "@/components/Blocks/Content";
import type { Blocks } from "@/types";

interface BlocksProps {
  blocks: Blocks;
}

const Blocks: FC<BlocksProps> = ({ blocks }) => {
  const components = new Map([["contentBlock", ContentBlock]]);

  return (
    <div>
      {blocks?.map((block, index) => {
        const Block = components.get(block.type);

        if (!Block) {
          return null;
        }

        return <Block key={index} {...block} />;
      })}
    </div>
  );
};

export default Blocks;
