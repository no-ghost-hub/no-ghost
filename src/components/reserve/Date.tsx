"use client";

import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading,
  I18nProvider,
} from "react-aria-components";
import {
  DateValue,
  getDayOfWeek,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";

import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import { Reservation } from "@/types";
import useSWR from "swr";
import useOdoo from "@/utils/useOdoo";

type Props = {
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
  onNext: () => void;
};

const ReserveDate = ({ reservation, setReservation, onNext }: Props) => {
  const { data: slots } = useSWR({ route: "reservation-slots" }, useOdoo);
  const { data: closingDays }: { data: [{ from: Date; to: Date }] } = useSWR(
    { route: "closing-days" },
    useOdoo,
  );

  const locale = "en-BE";

  const isDateUnavailable = (date: DateValue) => {
    const weekday = getDayOfWeek(date, locale);
    const availableSlots = slots?.times?.filter((t: any) => {
      return t.weekday === weekday;
    });

    const closed = closingDays?.some(
      ({ from, to }) =>
        date.toString() >= from.toString() && date.toString() <= to.toString(),
    );

    return !availableSlots?.length || closed;
  };

  function handleChange(date: DateValue) {
    setReservation({ ...reservation, date: date.toString() });
  }

  return (
    <I18nProvider locale={locale}>
      <div className="gap-s grid grid-rows-[1fr_auto]">
        <Calendar
          className="calendar gap-s grid self-center"
          isDateUnavailable={isDateUnavailable}
          minValue={today(getLocalTimeZone())}
          value={reservation.date ? parseDate(reservation.date) : null}
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
        <Link
          theme="button"
          background="orange"
          disabled={!reservation.date}
          onClick={onNext}
        >
          <Text tag="div">{s("ctas.next")}</Text>
        </Link>
      </div>
    </I18nProvider>
  );
};

export default ReserveDate;
