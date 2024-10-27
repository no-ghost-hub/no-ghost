import getEntry from "@/utils/getEntry";
import parsed from "@/utils/parsed";
import LinkBlock from "@/components/blocks/Link";
import MenuBlock from "@/components/blocks/Menu";
import OrderBlock from "@/components/blocks/Order";
import ReserveBlock from "@/components/blocks/Reserve";

import type { Menu } from "@/payload-types";

const components = {
  linkBlock: LinkBlock,
  menuBlock: MenuBlock,
  orderBlock: OrderBlock,
  reserveBlock: ReserveBlock,
};

type Props = {};

const Component = async ({}: Props) => {
  const main: Menu = await getEntry("main", "Menus");

  return (
    <div>
      <nav className="grid grid-flow-col">
        {main.items?.map((item) => {
          const Item = components[item.blockType];
          return <Item key={item.id} {...parsed(item, item.blockType)} />;
        })}
      </nav>
    </div>
  );
};

export default Component;
