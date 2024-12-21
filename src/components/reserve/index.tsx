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
import { useClickAway } from "react-use";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

const Reserve = ({}: Props) => {
  const [reservation, setReservation] = useState<Reservation>({
    date: null,
    time: null,
    guests: null,
    info: null,
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

  const el = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  // useClickAway(el, () => {
  //   router.replace(pathname);
  // });

  return (
    <NavigationToggleContainer value="reserve">
      <div
        ref={el}
        className="grid h-[calc(100svh-var(--h-nav)-theme(spacing.xs)*2)] grid-rows-[auto_1fr] bg-white"
      >
        <header className="grid gap-xs p-xs">
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
        <main className="grid overflow-y-auto p-xs">
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
