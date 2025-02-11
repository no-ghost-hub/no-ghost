import Wrapper from "@/components/utils/Wrapper";
import MenuGroups from "@/components/layout/MenuGroups";
import DeliveryOptions from "@/components/layout/DeliveryOptions";
import Reserve from "@/components/reserve";
import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";

import NavigationBar from "@/components/layout/NavigationBar";
import getEntry from "@/utils/getEntry";
import getGlobal from "@/utils/getGlobal";
import getReservationTypes from "@/odoo/getReservationTypes";
import getTables from "@/odoo/getTables";
import getReservationSlots from "@/odoo/getReservationSlots";
import getClosingDays from "@/odoo/getClosingDays";

type Props = {};

const Navigation = async ({}: Props) => {
  const [
    main,
    { home },
    { data: tables },
    { data: slots },
    { data: closingDays },
    { result: reservationTypes },
  ] = await Promise.all([
    getEntry("menus", "main"),
    getGlobal("site"),
    getTables(),
    getReservationSlots(),
    getClosingDays(),
    getReservationTypes(),
  ]);

  return (
    <div className="grid">
      <Wrapper type="navigation">
        <div className="-m-xs p-xs -mb-0 grid items-end overflow-hidden pb-0 *:col-start-1 *:row-start-1 sm:w-(--breakpoint-sm)">
          {/* <MenuGroups /> */}
          <DeliveryOptions />
          <Wrapper
            type="reserve"
            context={{ tables, slots, closingDays, reservationTypes }}
          >
            <Reserve />
          </Wrapper>
        </div>
        <NavigationBar {...{ main, home }} />
      </Wrapper>
    </div>
  );
};

export default Navigation;

export const NavigationLoading = () => {
  return (
    <div className="custom-underline animate-underline grid sm:w-(--breakpoint-sm)">
      <Link theme="button" background="white">
        <Text>&nbsp;</Text>
      </Link>
    </div>
  );
};
