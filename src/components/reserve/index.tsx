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
import { String } from "@/payload-types";
import { useEffect, useState } from "react";

import useOdoo from "@/utils/useOdoo";
import { Reservation } from "@/types";

type Props = {
  maxCapacity: number;
  strings: String["strings"];
  weekdays: number[];
  times: { from: number; to: number }[];
};

const Reserve = ({ maxCapacity, strings, weekdays, times }: Props) => {
  const [reservation, setReservation] = useState<Reservation>({
    date: null,
    time: null,
    guests: null,
    info: null,
  });

  const steps: {
    handle: "date" | "time" | "guests" | "info";
    title: string;
    component: any;
    props?: any;
  }[] = [
    {
      handle: "guests",
      title: "1. Guests",
      component: Guests,
    },
    {
      handle: "date",
      title: "2. Date",
      component: Date,
      props: { weekdays },
    },
    {
      handle: "time",
      title: "3. Time",
      component: Time,
      props: { times },
    },
    {
      handle: "info",
      title: "4. Info",
      component: Info,
    },
  ];

  const [result, setResult] = useState();

  useEffect(() => {
    if (Object.values(reservation).every((v) => v)) {
      (async () => {
        const result = await useOdoo({
          route: "reservations",
          method: "POST",
          body: JSON.stringify(reservation),
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

  return (
    <NavigationToggleContainer value="reserve">
      <div className="grid h-[calc(100svh-var(--h-nav)-theme(spacing.xs)*2)] grid-rows-[auto_1fr] bg-white">
        <header className="grid gap-xs p-xs">
          <Text tag="h3" align="center">
            {s("reserve.heading", strings)}
          </Text>
          {!result && (
            <div className="grid grid-flow-col">
              {steps.map(({ handle, title }, index) => {
                return (
                  <Link
                    theme="button"
                    key={index}
                    onClick={() => setStepIndex(index)}
                    disabled={!reservation[handle] && index !== stepIndex}
                    active={index === stepIndex}
                  >
                    <Text tag="div" wrap={false}>
                      {title}
                    </Text>
                  </Link>
                );
              })}
            </div>
          )}
        </header>
        <main className="grid overflow-y-auto p-xs">
          {result ? (
            <Result
              strings={strings}
              reservation={result.data}
              error={result.error}
            />
          ) : (
            step?.component && (
              <step.component
                {...step.props}
                {...{
                  maxCapacity,
                  strings,
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
