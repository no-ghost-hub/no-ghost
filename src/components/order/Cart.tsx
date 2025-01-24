"use client";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import Result from "@/components/order/Result";
import NavigationToggleContainer from "@/components/utils/NavigationToggleContainer";
import { useUiStore } from "@/components/providers/Global";
import { useCartStore } from "@/components/providers/Global";
import { s } from "@/utils/useClientString";
import CartThumb from "@/components/thumbs/Cart";
import useOdoo from "@/utils/useOdoo";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {};

const Cart = ({}: Props) => {
  const { navigation } = useUiStore((state) => state);
  const { cart, clear } = useCartStore((state) => state);

  const searchParams = useSearchParams();
  const table = searchParams.get("table");

  const [result, setResult] = useState<{ data?: any; error?: string }>();

  async function handleClick(payment: boolean = false) {
    const result = await useOdoo({
      route: "order",
      method: "POST",
      body: JSON.stringify({
        table,
        lines: cart,
      }),
      type: "create",
    });

    setResult(result);

    if (result.data) {
      clear();
      if (payment) {
        setTimeout(() => {
          redirect(
            `${process.env.NEXT_PUBLIC_ODOO_PAY_ENDPOINT || "https://noghost.odoo.com/pos/pay"}/${result.data.id}?access_token=${result.data.token}`,
          );
        }, 1000);
      }
    }
  }

  return (
    <NavigationToggleContainer show={navigation === "cart"}>
      <div className="pointer-events-auto grid h-[calc(100svh-var(--h-nav)-(var(--spacing-xs))*2)] grid-rows-[auto_1fr] bg-white shadow sm:w-(--breakpoint-sm)">
        <header className="gap-xs p-xs grid">
          <Text tag="h3" align="center">
            {s("cart")}
          </Text>
        </header>
        {!result ? (
          <main className="gap-s grid grid-rows-[1fr] overflow-y-auto">
            <div className="gap-xs p-xs grid content-center">
              {cart.map((item) => (
                <CartThumb key={item.id} {...item} />
              ))}
              <div className={`${cart.length > 0 ? "hidden" : "grid"} `}>
                <Text align="center">{s("cart.empty")}</Text>
              </div>
            </div>
            <div className="p-xs grid">
              <Link
                theme="button"
                background="white"
                onClick={() => handleClick(false)}
                disabled={!cart.length}
              >
                <Text tag="div">{s("ctas.order.send")}</Text>
              </Link>
              <Link
                theme="button"
                background="orange"
                onClick={() => handleClick(true)}
                disabled={!cart.length}
              >
                <Text tag="div">{s("ctas.order.pay")}</Text>
              </Link>
            </div>
          </main>
        ) : (
          <Result order={result.data} error={result.error} />
        )}
      </div>
    </NavigationToggleContainer>
  );
};

export default Cart;
