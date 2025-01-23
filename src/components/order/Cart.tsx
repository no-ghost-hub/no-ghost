"use client";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import NavigationToggleContainer from "@/components/utils/NavigationToggleContainer";
import { useUiStore } from "@/components/providers/Global";
import { useCartStore } from "@/components/providers/Global";
import { s } from "@/utils/useClientString";
import CartThumb from "@/components/thumbs/Cart";

type Props = {};

const Cart = ({}: Props) => {
  const { navigation } = useUiStore((state) => state);
  const { cart } = useCartStore((state) => state);

  async function handleClick() {}

  return (
    <NavigationToggleContainer show={navigation === "cart"}>
      <div className="grid h-[calc(100svh-var(--h-nav)-theme(spacing.xs)*2)] grid-rows-[auto_1fr] bg-white shadow">
        <header className="grid gap-xs p-xs">
          <Text tag="h3" align="center">
            {s("cart")}
          </Text>
        </header>
        <main className="grid grid-rows-[1fr] overflow-y-auto">
          <div className="grid content-center gap-xs p-xs">
            {cart.map((item) => (
              <CartThumb key={item.id} {...item} />
            ))}
          </div>
          <div className="grid p-xs">
            <Link theme="button" background="orange" onClick={handleClick}>
              <Text tag="div">{s("ctas.checkout")}</Text>
            </Link>
          </div>
        </main>
      </div>
    </NavigationToggleContainer>
  );
};

export default Cart;
