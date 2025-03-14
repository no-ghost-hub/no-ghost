"use client";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import Result from "@/components/order/Result";
import NavigationToggleContainer from "@/components/utils/NavigationToggleContainer";
import { useUiStore } from "@/components/providers/Global";
import { useCartStore } from "@/components/providers/Global";
import { useString } from "@/utils/useClientString";
import CartThumb from "@/components/thumbs/Cart";
import { redirect, useSearchParams } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import Loader from "@/components/utils/Loader";
import createOrder from "@/odoo/createOrder";
import FormsText from "@/components/forms/Text";
import { Form } from "react-aria-components";
import getDiscount from "@/odoo/getDiscount";
import Accordion from "@/components/elements/Accordion";

type Props = {
  already: any;
};

const Cart = ({ already }: Props) => {
  const { navigation, setNavigation } = useUiStore((state) => state);

  const { cart, add, clear, discount, setDiscount, applyDiscount } =
    useCartStore((state) => state);

  const searchParams = useSearchParams();
  const table = searchParams.get("table");

  const [payment, setPayment] = useState(false);
  const [result, formAction, pending] = useActionState(
    createOrder.bind(null, { table: table || "", lines: cart }),
    null,
  );

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
        const endpoint = `${process.env.NEXT_PUBLIC_ODOO_URL}/pos/pay`;
        const exit = `https://${process.env.NEXT_PUBLIC_ORDER_HOST}/?table=${table}`;

        redirect(
          `${endpoint}/${result.data.id}?access_token=${result.data.token}&exit_route=${exit}`,
        );
      }
    }
  }, [result]);

  const s = useString();

  const [discountResult, discountAction, discountPending] = useActionState(
    getDiscount,
    null,
  );

  useEffect(() => {
    if (discountResult?.data) {
      setDiscount(discountResult.data);
      applyDiscount();
    }
  }, [discountResult]);

  return (
    <NavigationToggleContainer show={navigation === "cart"}>
      <div className="pointer-events-auto grid h-[calc(100svh-var(--h-nav)-(var(--spacing-xs))*2)] grid-rows-[auto_1fr] bg-white shadow sm:w-(--breakpoint-sm)">
        <header className="gap-xs p-xs grid">
          <Text tag="h3" align="center">
            {s("cart")}
          </Text>
        </header>
        {result || already?.state === "done" ? (
          <Result
            order={result?.data || already}
            error={result?.error?.data.message}
            payment={already?.state === "done"}
          />
        ) : (
          <main className="gap-s grid grid-rows-[1fr] overflow-y-auto">
            {pending ? (
              <Loader>
                <Text tag="div" align="center" wrap={false}>
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
                  {discount ? (
                    <div className="pb-xs grid">
                      <Link
                        theme="button"
                        background="green"
                        onClick={() => setDiscount(undefined)}
                      >
                        <div className="grid grid-flow-col justify-between">
                          <Text typo="sm">X</Text>
                          <Text wrap={false} typo="sm">
                            {discount.code}
                          </Text>
                          <Text typo="sm">X</Text>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <Accordion
                      trigger={
                        <Text tag="h5" align="center" wrap={false}>
                          {s("cart.discountCode")}
                        </Text>
                      }
                    >
                      <div className="gap-xs py-xs grid">
                        <Form action={discountAction}>
                          <div className="gap-y-xs grid grid-flow-col grid-cols-[1fr]">
                            <FormsText
                              name="code"
                              validation={false}
                              label={s("cart.discountCode")}
                              showLabel={false}
                            />
                            <Link
                              type="submit"
                              theme="button"
                              background="green"
                            >
                              <Text tag="div">{s("ctas.discountCode")}</Text>
                            </Link>
                          </div>
                        </Form>
                        <Text typo="sm" color="orange">
                          {discountResult && !discountResult.data ? (
                            s("discountCode.error")
                          ) : (
                            <>&nbsp;</>
                          )}
                        </Text>
                      </div>
                    </Accordion>
                  )}
                  <Link
                    theme="button"
                    background="orange"
                    onClick={() => handleClick(false)}
                    disabled={!cart.length}
                  >
                    <Text tag="div">{s("ctas.order.send")}</Text>
                  </Link>
                  {/* <Link
                    theme="button"
                    background="orange"
                    onClick={() => handleClick(true)}
                    disabled={!cart.length}
                  >
                    <Text tag="div">{s("ctas.order.pay")}</Text>
                  </Link> */}
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
