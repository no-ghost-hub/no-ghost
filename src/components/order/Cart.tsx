"use client";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import Result from "@/components/order/Result";
import NavigationToggleContainer from "@/components/utils/NavigationToggleContainer";
import { useUiStore } from "@/components/providers/Global";
import { useCartStore } from "@/components/providers/Global";
import { useString } from "@/utils/useClientString";
import CartThumb from "@/components/thumbs/Cart";
import useOdoo from "@/utils/useOdoo";
import { redirect, useSearchParams } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import Loader from "@/components/utils/Loader";
import useSWR from "swr";
import createOrder from "@/odoo/createOrder";

type Props = {};

const Cart = ({}: Props) => {
  const { navigation, setNavigation } = useUiStore((state) => state);
  const { cart, clear } = useCartStore((state) => state);

  const searchParams = useSearchParams();
  const table = searchParams.get("table");
  const id = searchParams.get("id");

  const [payment, setPayment] = useState(false);
  const [result, formAction, pending] = useActionState(
    createOrder.bind(null, { table: table || "", lines: cart }),
    null,
  );

  useEffect(() => {
    if (id) {
      setNavigation("cart");
    }
  }, [id]);

  const {
    data: order,
    isLoading,
    error,
  } = useSWR(id ? { route: `order?id=${id}` } : null, useOdoo);

  function handleClick(payment: boolean = false) {
    setPayment(payment);
    startTransition(() => {
      formAction();
    });
  }

  useEffect(() => {
    if (result?.data) {
      clear();
      if (payment) {
        const endpoint = process.env.NEXT_PUBLIC_ODOO_PAY_ENDPOINT;
        const exit = `${process.env.NEXT_PUBLIC_SERVER_URL}/order?table=${table}&id=${result.data.id}`;

        redirect(
          `${endpoint}/${result.data.id}?access_token=${result.data.token}&exit_route=${exit}`,
        );
      }
    }
  }, [result]);

  const s = useString();

  return (
    <NavigationToggleContainer show={navigation === "cart"}>
      <div className="pointer-events-auto grid h-[calc(100svh-var(--h-nav)-(var(--spacing-xs))*2)] grid-rows-[auto_1fr] bg-white shadow sm:w-(--breakpoint-sm)">
        <header className="gap-xs p-xs grid">
          <Text tag="h3" align="center">
            {s("cart")}
          </Text>
        </header>
        {result || order ? (
          <Result
            order={result?.data || order}
            error={result?.error?.data.message || error}
            payment={payment}
          />
        ) : (
          <main className="gap-s grid grid-rows-[1fr] overflow-y-auto">
            {pending || isLoading ? (
              <Loader>
                <Text tag="div">
                  {s(payment ? "loading.order.payment" : "loading.order")}
                </Text>
              </Loader>
            ) : (
              <>
                <div className="gap-xs p-xs grid content-center">
                  {cart.map((item) => (
                    <CartThumb key={item.id} {...item} />
                  ))}
                  <div className={`${cart.length > 0 ? "hidden" : "grid"} `}>
                    <Text align="center">{s("cart.empty")}</Text>
                  </div>
                </div>
                <div className="p-xs sticky bottom-0 grid bg-white">
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
              </>
            )}
          </main>
        )}
      </div>
    </NavigationToggleContainer>
  );
};

export default Cart;
