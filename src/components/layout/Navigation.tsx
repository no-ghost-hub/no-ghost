import getEntry from "@/utils/getEntry";
import getGlobal from "@/utils/getGlobal";
import useOdoo from "@/utils/useOdoo";
import parsed from "@/utils/parsed";

import LinkBlock from "@/components/blocks/Link";
import MenuBlock from "@/components/blocks/Menu";
import OrderBlock from "@/components/blocks/Order";
import ReserveBlock from "@/components/blocks/Reserve";
import SizeUtil from "@/components/utils/Size";
import MenuGroups from "@/components/layout/MenuGroups";
import DeliveryOptions from "@/components/layout/DeliveryOptions";
import Reserve from "@/components/reserve";

import type { Menu } from "@/payload-types";

const components = {
  linkBlock: LinkBlock,
  menuBlock: MenuBlock,
  orderBlock: OrderBlock,
  reserveBlock: ReserveBlock,
};

type Props = {};

const Navigation = async ({}: Props) => {
  const main: Menu = await getEntry("menus", "main");
  const { home } = await getGlobal("site");
  const { strings } = await getGlobal("strings");
  const { data: slots } = await useOdoo({ route: "reservation-slots" });
  const { data: reservationTypes } = await useOdoo({
    route: "reservation-types",
  });

  return (
    main && (
      <div className="grid">
        <div className="grid items-end overflow-hidden *:col-start-1 *:row-start-1">
          <MenuGroups />
          <DeliveryOptions />
          <Reserve
            maxCapacity={reservationTypes?.maxCapacity}
            strings={strings}
            weekdays={slots?.weekdays}
            times={slots?.times}
          />
        </div>
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
    )
  );
};

export default Navigation;
