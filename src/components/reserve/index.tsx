"use client";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import NavigationToggleContainer from "@/components/utils/NavigationToggleContainer";
import Date from "@/components/reserve/Date";
import Time from "@/components/reserve/Time";
import Guests from "@/components/reserve/Guests";
import Info from "@/components/reserve/Info";
import Result from "@/components/reserve/Result";
import { s } from "@/utils/useClientString";
import { useEffect, useRef, useState } from "react";

import useOdoo from "@/utils/useOdoo";
import { Reservation } from "@/types";
import { useUiStore } from "@/components/providers/Global";

type Props = {};

const Reserve = ({}: Props) => {
  const [reservation, setReservation] = useState<Reservation>({
    date: undefined,
    time: undefined,
    guests: undefined,
    info: undefined,
  });

  const steps: {
    handle: "date" | "time" | "guests" | "info";
    component: any;
  }[] = [
    {
      handle: "guests",
      component: Guests,
    },
    {
      handle: "date",
      component: Date,
    },
    {
      handle: "time",
      component: Time,
    },
    {
      handle: "info",
      component: Info,
    },
  ];

  const [result, setResult] = useState<{ data?: any; error?: string }>();

  useEffect(() => {
    if (Object.values(reservation).every((v) => v)) {
      (async () => {
        const result = await useOdoo({
          route: "reservations",
          method: "POST",
          body: JSON.stringify(reservation),
          type: "create",
        });

        setResult(result);
      })();
    }
  }, [reservation]);

  const [stepIndex, setStepIndex] = useState(0);

  const step = steps[stepIndex];

  async function handleNext() {
    setStepIndex(stepIndex + 1);
  }

  const { navigation } = useUiStore((state) => state);

  const stepEl = useRef<HTMLElement>(null);
  useEffect(() => {
    stepEl.current?.scrollTo({ top: 0 });
  }, [stepIndex]);

  return (
    <NavigationToggleContainer show={navigation === "reserve"}>
      <div className="pointer-events-auto grid h-[calc(100svh-var(--h-nav)-(var(--spacing-xs))*2)] grid-rows-[auto_1fr] bg-white">
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
                    disabled={!reservation[handle] && index !== stepIndex}
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
          {result ? (
            <Result reservation={result.data} error={result.error} />
          ) : (
            step?.component && (
              <step.component
                {...{
                  reservation,
                  setReservation,
                }}
                onNext={handleNext}
              />
            )
          )}
        </main>
      </div>
    </NavigationToggleContainer>
  );
};

export default Reserve;
