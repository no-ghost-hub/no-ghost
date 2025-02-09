"use client";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import NavigationToggleContainer from "@/components/utils/NavigationToggleContainer";
import Calendar from "@/components/reserve/Date";
import Time from "@/components/reserve/Time";
import Guests from "@/components/reserve/Guests";
import Info from "@/components/reserve/Info";
import Result from "@/components/reserve/Result";
import { s } from "@/utils/useClientString";
import { JSX, useEffect, useRef, useState } from "react";

import { Reservation } from "@/types";
import { useUiStore } from "@/components/providers/Global";
import createReservation from "@/odoo/createReservation";
import { I18nProvider, Form } from "react-aria-components";
import { getLocalTimeZone, today } from "@internationalized/date";

type Props = {};

const Reserve = ({}: Props) => {
  // const [reservation, setReservation] = useState<Reservation>({
  //   guests: 2,
  //   date: today(getLocalTimeZone()).toString(),
  //   time: undefined,
  //   info: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     phone: "",
  //     message: "",
  //     marketing: true,
  //   },
  // });

  const formEl = useRef<HTMLFormElement>(null);

  const steps: {
    handle: "date" | "time" | "guests" | "info";
    component: (props: any) => JSX.Element;
  }[] = [
    { handle: "guests", component: Guests },
    { handle: "date", component: Calendar },
    { handle: "time", component: Time },
    { handle: "info", component: Info },
  ];

  const [result, setResult] = useState<{ data?: any; error?: string }>();
  const [loading, setLoading] = useState(false);

  const [stepIndex, setStepIndex] = useState(0);

  const step = steps[stepIndex];

  function handleNext() {
    if (stepIndex === steps.length - 1) {
      formEl.current?.requestSubmit();
    } else {
      setStepIndex(stepIndex + 1);
    }
  }

  const { navigation } = useUiStore((state) => state);

  const stepEl = useRef<HTMLElement>(null);
  useEffect(() => {
    stepEl.current?.scrollTo({ top: 0 });
  }, [stepIndex]);

  return (
    <NavigationToggleContainer show={navigation === "reserve"}>
      <div className="pointer-events-auto grid h-[calc(100svh-var(--h-nav)-(var(--spacing-xs))*2)] grid-rows-[auto_1fr] bg-white shadow">
        <header className="gap-xs p-xs grid">
          <Text tag="h3" align="center">
            {s("reserve.heading")}
          </Text>
          {!result && (
            <div className="grid grid-flow-col">
              {steps.map(({ handle }, index) => {
                return (
                  <Link
                    theme="button"
                    key={index}
                    onClick={() => setStepIndex(index)}
                    disabled={index > stepIndex}
                    active={index === stepIndex}
                    shadow={false}
                  >
                    <Text tag="div" wrap={false}>
                      {`${index + 1}. ${s(`reserve.${handle}`)}`}
                    </Text>
                  </Link>
                );
              })}
            </div>
          )}
        </header>
        <main className="p-xs grid overflow-y-auto" ref={stepEl}>
          <div className="gap-s grid grid-rows-[1fr]">
            {result ? (
              <Result reservation={result.data} error={result.error} />
            ) : (
              <>
                <I18nProvider locale="en-BE">
                  <Form
                    className="grid"
                    ref={formEl}
                    action={() => createReservation(reservation)}
                  >
                    {steps.map((step, index) => (
                      <div
                        key={step.handle}
                        className={index === stepIndex ? "grid" : "hidden"}
                      >
                        <step.component />
                      </div>
                    ))}
                  </Form>
                </I18nProvider>
                <Link theme="button" background="orange" onClick={handleNext}>
                  {/* disabled={!reservation[step.handle]} */}
                  <Text tag="div">{s("ctas.next")}</Text>
                </Link>
              </>
            )}
          </div>
        </main>
      </div>
    </NavigationToggleContainer>
  );
};

export default Reserve;
