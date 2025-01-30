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
    <div className={`grid`}>
      <Wrapper type="navigation">
        <Wrapper type="order">
          <div className="-m-xs p-xs -mb-0 grid items-end overflow-hidden pb-0">
            <Cart />
          </div>
        </Wrapper>
        <SizeUtil name="nav" height={true}>
          <nav className="nav pointer-events-auto grid bg-white *:col-start-1 *:row-start-1">
            <Link
              theme="button"
              onClick={handleClick}
              active={navigation === "cart"}
            >
              <Text wrap={false} tag="div">
                {s(navigation === "cart" ? "ctas.close" : "ctas.cart")}
              </Text>
            </Link>
            <div
              className={`${totalQuantity() > 0 ? "grid" : "hidden"} grid-flow-col justify-between`}
            >
              <div className="p-xs">
                <Text tag="div">{totalQuantity()}</Text>
              </div>
              <div className="p-xs">
                <Text tag="div">
                  {formatPrice(totalPrice(), useCurrency())}
                </Text>
              </div>
            </div>
          </nav>
        </SizeUtil>
      </Wrapper>
    </div>
  );
};

export default OrderBar;
