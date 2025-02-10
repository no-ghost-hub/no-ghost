"use client";

import { RadioGroup } from "react-aria-components";
import { Reservation } from "@/types";
import { useContext } from "react";
import Context from "@/components/utils/Context";
import { getDayOfWeek, parseDate } from "@internationalized/date";
import TimeSlot from "@/components/reserve/TimeSlot";

type Props = {
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
};

const ReserveTime = ({ reservation, setReservation }: Props) => {
  const locale = "en-BE";
  const { slots, reservationTypes } = useContext(Context);

  let daySlots = [];
  if (reservation.date) {
    const weekday = getDayOfWeek(parseDate(reservation.date), locale);
    daySlots = slots.times.filter((t: any) => t.weekday === weekday);
  }

  const type = (time: any) => {
    return reservationTypes.types.find((t: any) => t.id === time.type);
  };

  function handleChange(time: string) {
    const parsedTime = JSON.parse(time);
    const { timeZone, location } = type(parsedTime);

    setReservation({ ...reservation, time: parsedTime, timeZone, location });
  }

  return (
    <RadioGroup
      className="grid self-center"
      aria-label="Reservation time"
      value={JSON.stringify(reservation.time) || ""}
      onChange={handleChange}
    >
      {daySlots.map((time: any) => (
        <TimeSlot
          key={time.from}
          guests={reservation.guests || 0}
          date={reservation.date || ""}
          time={time}
          timeZone={type(time).timeZone}
        />
      ))}
    </RadioGroup>
  );
};

export default ReserveTime;
