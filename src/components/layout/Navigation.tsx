import getEntry from "@/utils/getEntry";
import getGlobal from "@/utils/getGlobal";
import parsed from "@/utils/parsed";

import LinkBlock from "@/components/blocks/Link";
import MenuBlock from "@/components/blocks/Menu";
import OrderBlock from "@/components/blocks/Order";
import ReserveBlock from "@/components/blocks/Reserve";
import SizeUtil from "@/components/utils/Size";

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
    <div>
      {/* <nav className="grid grid-flow-col justify-center bg-green">
        <Link theme="button">Takeway.com</Link>
        <Link theme="button">Deliveroo</Link>
      </nav> */}
      <div className="relative">
        <nav className="grid grid-flow-col">
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
        <SizeUtil name="nav" height={true} />
      </div>
    </div>
  );
};

export default Navigation;
