"use client";

import { RadioGroup, Radio, I18nProvider } from "react-aria-components";
import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import { Reservation } from "@/types";
import useSWR from "swr";
import useOdoo from "@/utils/useOdoo";
import { useContext } from "react";
import Context from "@/components/utils/Context";
import { isSlotAvailable } from "@/utils/isSlotAvailable";
import { getDayOfWeek, parseDate } from "@internationalized/date";

type Props = {
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
  onNext: () => void;
};

const ReserveTime = ({ reservation, setReservation, onNext }: Props) => {
  const locale = "en-BE";

  const { data: slots } = useSWR({ route: "reservation-slots" }, useOdoo);
  const { data: reservations }: { data: any[] } = useSWR(
    { route: "reservations" },
    useOdoo,
  );

  let daySlots = [];
  if (reservation.date) {
    const weekday = getDayOfWeek(parseDate(reservation.date), locale);
    daySlots = slots.times.filter((t: any) => t.weekday === weekday);
  }

  const { reservationTypes } = useContext(Context);

  const type = (time: any) => {
    return reservationTypes.types.find((t: any) => t.id === time.type);
  };

  function handleChange(time: string) {
    const parsedTime = JSON.parse(time);
    const { timeZone, location } = type(parsedTime);

    setReservation({
      ...reservation,
      time: parsedTime,
      timeZone,
      location,
    });
  }

  return (
    <I18nProvider locale={locale}>
      <div className="grid grid-rows-[1fr_auto] gap-s">
        <RadioGroup
          className="grid self-center"
          aria-label="Reservation time"
          value={JSON.stringify(reservation.time)}
          onChange={handleChange}
        >
          {daySlots.map((time: any) => (
            <Radio
              key={time.from}
              value={JSON.stringify(time)}
              className="custom-underline cursor-pointer data-[disabled]:pointer-events-none data-[selected]:bg-grey data-[disabled]:text-darkgrey"
              isDisabled={
                !isSlotAvailable(
                  reservation.guests || 0,
                  reservation.date || "",
                  time,
                  type(time).capacity,
                  reservations,
                )
              }
            >
              <div className="grid grid-flow-col items-end justify-between p-xs">
                <Text tag="div">{time.from}</Text>
                <Text tag="div" typo="note" wrap={false}>
                  {isSlotAvailable(
                    reservation.guests || 0,
                    reservation.date || "",
                    time,
                    type(time).capacity,
                    reservations,
                  )
                    ? `${s("reserve.to")} ${time.to}`
                    : `${s("reserve.booked")}`}
                </Text>
              </div>
            </Radio>
          ))}
        </RadioGroup>
        <Link
          theme="button"
          background="orange"
          disabled={!reservation.time}
          onClick={onNext}
        >
          <Text tag="div">{s("ctas.next")}</Text>
        </Link>
      </div>
    </I18nProvider>
  );
};

export default ReserveTime;
