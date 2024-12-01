import getEntry from "@/utils/getEntry";
import getGlobal from "@/utils/getGlobal";
import parsed from "@/utils/parsed";

import LinkBlock from "@/components/blocks/Link";
import MenuBlock from "@/components/blocks/Menu";
import OrderBlock from "@/components/blocks/Order";
import ReserveBlock from "@/components/blocks/Reserve";
import SizeUtil from "@/components/utils/Size";
import MenuGroups from "@/components/layout/MenuGroups";

import type { Menu } from "@/payload-types";

const components = {
  linkBlock: LinkBlock,
  menuBlock: MenuBlock,
  orderBlock: OrderBlock,
  reserveBlock: ReserveBlock,
};

type Props = {};

const Navigation = async ({}: Props) => {
  const main: Menu = await getEntry("Menus", "main");
  const { home } = await getGlobal("Site");

  return (
    <div className="grid">
      <MenuGroups />
      <SizeUtil name="nav" height={true}>
        <nav className="grid grid-flow-col justify-center bg-white">
          {main.items?.map((item) => {
            const Item = components[item.blockType];
            return (
              <Item
                key={item.id}
                {...parsed({ ...item, homeHref: home.href }, item.blockType)}
              />
            );
          })}
        </nav>
      </SizeUtil>
    </div>
  );
};

export default Navigation;
