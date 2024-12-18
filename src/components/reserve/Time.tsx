"use client";

import { RadioGroup, Radio, Label, I18nProvider } from "react-aria-components";
import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import { String } from "@/payload-types";
import { Reservation } from "@/types";
import useSWR from "swr";
import useOdoo from "@/utils/useOdoo";

type Props = {
  strings: String["strings"];
  maxCapacity: number;
  times: { from: number; to: number; type: number }[];
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
  onNext: () => void;
};

const ReserveTime = ({
  strings,
  maxCapacity,
  times,
  reservation,
  setReservation,
  onNext,
}: Props) => {
  const locale = "en-BE";

  const { data: reservations }: { data: any[] } = useSWR(
    { route: "reservations" },
    useOdoo,
  );

  function handleChange(time: string) {
    setReservation({ ...reservation, time: JSON.parse(time) });
  }

  const isAvailable = (time: { from: number; to: number }) => {
    const slotStart = new Date(`${reservation.date}T${time.from}:00`);
    const slotEnd = new Date(`${reservation.date}T${time.to}:00`);

    const overlapping = reservations?.filter((r) => {
      const reservationStart = new Date(r.event_start);
      const reservationEnd = new Date(r.event_stop);

      const isSameDay =
        slotStart.toDateString() === reservationStart.toDateString();

      return (
        isSameDay && slotStart < reservationEnd && slotEnd > reservationStart
      );
    });

    const reservedCapacity = overlapping?.reduce(
      (acc, r) => acc + r.capacity_reserved,
      0,
    );

    return reservedCapacity + reservation.guests < maxCapacity;
  };

  return (
    <I18nProvider locale={locale}>
      <div className="grid grid-rows-[1fr_auto] gap-s">
        <RadioGroup
          className="grid self-center"
          aria-label="Reservation time"
          value={JSON.stringify(reservation.time)}
          onChange={handleChange}
        >
          {times.map((time) => (
            <Radio
              key={time.from}
              value={JSON.stringify(time)}
              className="custom-underline cursor-pointer data-[disabled]:pointer-events-none data-[disabled]:bg-grey data-[selected]:bg-grey data-[disabled]:text-darkgrey"
              isDisabled={!isAvailable(time)}
            >
              <div className="grid grid-flow-col items-end justify-between p-xs">
                <Text tag="div">{time.from}</Text>
                <Text tag="div" typo="note" wrap={false}>
                  {isAvailable(time)
                    ? `${s("reserve.to", strings)} ${time.to}`
                    : `${s("reserve.booked", strings)}`}
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
          <Text tag="div">{s("ctas.next", strings)}</Text>
        </Link>
      </div>
    </I18nProvider>
  );
};

export default ReserveTime;
