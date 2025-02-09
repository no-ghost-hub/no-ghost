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
import { useActionState, useEffect, useRef, useState } from "react";

import { Reservation } from "@/types";
import { useUiStore } from "@/components/providers/Global";
import createReservation from "@/odoo/createReservation";
import { I18nProvider, Form } from "react-aria-components";
import { getLocalTimeZone, today } from "@internationalized/date";

type Props = {};

const Reserve = ({}: Props) => {
  const [reservation, setReservation] = useState<Reservation>({
    guests: 2,
    date: today(getLocalTimeZone()).toString(),
    time: undefined,
    info: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      marketing: true,
    },
  });

  const formEl = useRef<HTMLFormElement>(null);

  const steps: {
    handle: "date" | "time" | "guests" | "info";
    component: any;
  }[] = [
    { handle: "guests", component: Guests },
    { handle: "date", component: Calendar },
    { handle: "time", component: Time },
    { handle: "info", component: Info },
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[stepIndex];

  function handleNext() {
    if (stepIndex === steps.length - 1) {
      formEl.current?.requestSubmit();
    } else {
      setStepIndex(stepIndex + 1);
    }
  }

  const [state, formAction, pending] = useActionState(
    createReservation.bind(null, reservation),
    null,
  );

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
          {!state && (
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
            {state ? (
              <Result reservation={state.data} error={state.error} />
            ) : (
              <>
                <I18nProvider locale="en-BE">
                  <Form className="grid" ref={formEl} action={formAction}>
                    {step?.component && (
                      <step.component {...{ reservation, setReservation }} />
                    )}
                  </Form>
                </I18nProvider>
                <Link
                  theme="button"
                  background="orange"
                  disabled={!reservation[step.handle]}
                  onClick={handleNext}
                >
                  <Text tag="div">
                    {s(
                      stepIndex === steps.length - 1
                        ? "ctas.confirm"
                        : "ctas.next",
                    )}
                  </Text>
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
