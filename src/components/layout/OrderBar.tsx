"use client";

import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";
import SizeUtil from "@/components/utils/Size";
import Wrapper from "@/components//utils/Wrapper";
import { useUiStore } from "@/components//providers/Global";

import { totalQuantity, totalPrice } from "@/stores/cart";
import { s } from "@/utils/useClientString";
import formatPrice from "@/utils/formatPrice";
import useCurrency from "@/utils/useCurrency";
import Cart from "@/components/order/Cart";

type Props = {};

const OrderBar = ({}: Props) => {
  const { setNavigation, navigation } = useUiStore((state) => state);
  function handleClick() {
    if (navigation === "cart") {
      setNavigation("");
    } else {
      setNavigation("cart");
    }
  }
  return (
    <div className="pointer-events-auto grid">
      <Wrapper type="navigation">
        <div className="-m-xs -mb-0 grid items-end overflow-hidden p-xs pb-0 *:col-start-1 *:row-start-1 [&>*]:pointer-events-auto">
          <Cart />
        </div>
        <SizeUtil name="nav" height={true}>
          <nav className="grid bg-white shadow *:col-start-1 *:row-start-1">
            <div className="grid place-content-center">
              <Link
                theme="button"
                onClick={handleClick}
                active={navigation === "cart"}
              >
                <Text wrap={false}>{s("ctas.cart")}</Text>
              </Link>
            </div>
            <div className="pointer-events-none grid grid-flow-col items-center justify-between gap-xs">
              <div className="pointer-events-auto p-xs">
                <Text>{totalQuantity()}</Text>
              </div>
              <div className="invisible">
                <Text wrap={false}>{s("ctas.cart")}</Text>
              </div>
              <div className="pointer-events-auto p-xs">
                <Text>{formatPrice(totalPrice(), useCurrency())}</Text>
              </div>
            </div>
          </nav>
        </SizeUtil>
      </Wrapper>
    </div>
  );
};

export default OrderBar;
