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

type Props = {
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
  onNext: () => void;
};

const ReserveTime = ({ reservation, setReservation, onNext }: Props) => {
  const locale = "en-BE";

  const { data: reservations }: { data: any[] } = useSWR(
    { route: "reservations" },
    useOdoo,
  );
  const { data: slots } = useSWR({ route: "reservation-slots" }, useOdoo);

  const { reservationTypes } = useContext(Context);

  function handleChange(time: string) {
    const parsedTime = JSON.parse(time);
    const { timeZone, location } = reservationTypes.types.find(
      (t: any) => t.id === parsedTime.type,
    );

    const utcDate = (dateString: string) => {
      const date = new Date(dateString);
      console.log(date);

      const zonedDate = new Date(date.toLocaleString("en-US", { timeZone }));
      return zonedDate.toISOString().replace("T", " ").slice(0, -5);
    };

    console.log(utcDate(`${reservation.date} ${parsedTime.from}`));

    setReservation({
      ...reservation,
      time: parsedTime,
      timeZone,
      location,
    });
  }

  const isAvailable = (time: { from: number; to: number }) => {
    const slotStart = new Date(`${reservation.date}T${time.from}:00`);
    const slotEnd = new Date(`${reservation.date}T${time.to}:00`);

    const overlapping = reservations?.filter((r) => {
      const reservationStart = new Date(r.from);
      const reservationEnd = new Date(r.to);

      const isSameDay =
        slotStart.toDateString() === reservationStart.toDateString();

      return (
        isSameDay && slotStart < reservationEnd && slotEnd > reservationStart
      );
    });

    const reservedCapacity = overlapping?.reduce(
      (acc, r) => acc + r.capacity,
      0,
    );

    return (
      reservedCapacity + reservation.guests <= reservationTypes.maxCapacity
    );
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
          {slots.times.map((time: any) => (
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
