import useOdoo from "@/utils/useOdoo";

import Wrapper from "@/components/utils/Wrapper";
import MenuGroups from "@/components/layout/MenuGroups";
import DeliveryOptions from "@/components/layout/DeliveryOptions";
import Reserve from "@/components/reserve";

import { Menu } from "@/payload-types";
import NavigationBar from "@/components/layout/NavigationBar";
import getEntry from "@/utils/getEntry";
import getGlobal from "@/utils/getGlobal";

type Props = {};

const Navigation = async ({}: Props) => {
  const main: Menu = await getEntry("menus", "main");
  const { home } = await getGlobal("site");
  const { data: reservationTypes } = await useOdoo({
    route: "reservation-types",
  });

  return (
    <div className="grid">
      <Wrapper type="navigation">
        <div className="-m-xs p-xs -mb-0 grid items-end overflow-hidden pb-0 *:col-start-1 *:row-start-1 sm:w-(--breakpoint-sm)">
          {/* <MenuGroups /> */}
          <DeliveryOptions />
          <Wrapper type="reserve" context={{ reservationTypes }}>
            <Reserve />
          </Wrapper>
        </div>
        <NavigationBar {...{ main, home }} />
      </Wrapper>
    </div>
  );
};

export default Navigation;
