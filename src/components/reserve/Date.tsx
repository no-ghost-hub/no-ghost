"use client";

import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading,
  useLocale,
} from "react-aria-components";
import {
  DateValue,
  getDayOfWeek,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";

import Text from "@/components/elements/Text";
import { Reservation } from "@/types";
import { useContext } from "react";
import Context from "@/components/utils/Context";

type Props = {
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
};

const ReserveDate = ({ reservation, setReservation }: Props) => {
  const {
    slots,
    closingDays,
  }: { slots: any; closingDays: { from: Date; to: Date }[] } =
    useContext(Context);

  const { locale } = useLocale();

  const isDateUnavailable = (date: DateValue) => {
    const weekday = getDayOfWeek(date, locale);
    const availableSlots = slots?.times?.filter((t: any) => {
      return t.weekday === weekday;
    });

    const jsDate = date.toDate(getLocalTimeZone());
    const closed = closingDays?.some(
      ({ from, to }) => jsDate >= from && jsDate <= to,
    );

    return !availableSlots?.length || closed;
  };

  function handleChange(date: DateValue) {
    setReservation({ ...reservation, date: date.toString() });
  }

  return (
    <Calendar
      className="calendar gap-s grid self-center"
      isDateUnavailable={isDateUnavailable}
      minValue={today(getLocalTimeZone())}
      value={reservation.date ? parseDate(reservation.date) : undefined}
      onChange={handleChange}
      aria-label="Reservation date"
    >
      <header className="grid grid-flow-col grid-cols-7 items-center">
        <Button
          slot="previous"
          className="hover:text-orange data-disabled:text-darkgrey"
        >
          <Text tag="div" typo="md">
            ←
          </Text>
        </Button>
        <Heading level={4} className="typo-base col-span-5 text-center" />
        <Button
          slot="next"
          className="hover:text-orange data-disabled:text-darkgrey"
        >
          <Text tag="div" typo="md">
            →
          </Text>
        </Button>
      </header>
      <CalendarGrid
        weekdayStyle="narrow"
        className="[&_th]:p-xs [&_th]:grid [&_th]:place-items-center [&_tr]:grid [&_tr]:grid-cols-7"
      >
        {(date) => (
          <CalendarCell
            date={date}
            className="custom-underline p-xs typo-base aria-[disabled]:text-darkgrey data-selected:bg-grey text-center aria-[disabled]:pointer-events-none data-outside-month:hidden data-selected:border-b-black"
          />
        )}
      </CalendarGrid>
    </Calendar>
  );
};

export default ReserveDate;
