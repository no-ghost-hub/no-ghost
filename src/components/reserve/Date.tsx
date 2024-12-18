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
import { String } from "@/payload-types";
import { Reservation } from "@/types";
import useSWR from "swr";
import useOdoo from "@/utils/useOdoo";

type Props = {
  strings: String["strings"];
  weekdays?: number[];
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
  onNext: () => void;
};

const ReserveDate = ({
  strings,
  weekdays,
  reservation,
  setReservation,
  onNext,
}: Props) => {
  const { data: slots } = useSWR({ route: "reservation-slots" }, useOdoo);

  const locale = "en-BE";

  const isDateUnavailable = (date: DateValue) => {
    const weekday = getDayOfWeek(date, locale);
    return !slots?.weekdays?.includes(weekday);
  };

  function handleChange(date: DateValue) {
    setReservation({ ...reservation, date: date.toString() });
  }

  return (
    <I18nProvider locale={locale}>
      <div className="grid grid-rows-[1fr_auto] gap-s">
        <Calendar
          className="calendar grid gap-s self-center"
          isDateUnavailable={isDateUnavailable}
          minValue={today(getLocalTimeZone())}
          value={reservation.date ? parseDate(reservation.date) : null}
          onChange={handleChange}
          aria-label="Reservation date"
        >
          <header className="grid grid-flow-col grid-cols-7 items-center">
            <Button
              slot="previous"
              className="hover:text-orange data-[disabled]:text-darkgrey"
            >
              <Text tag="div" typo="2">
                ←
              </Text>
            </Button>
            <Heading level={4} className="col-span-5 text-center typo-p" />
            <Button
              slot="next"
              className="hover:text-orange data-[disabled]:text-darkgrey"
            >
              <Text tag="div" typo="2">
                →
              </Text>
            </Button>
          </header>
          <CalendarGrid
            weekdayStyle="narrow"
            className="[&_th]:grid [&_th]:place-items-center [&_th]:p-xs [&_tr]:grid [&_tr]:grid-cols-7"
          >
            {(date) => (
              <CalendarCell
                date={date}
                className="custom-underline p-xs text-center typo-p aria-[disabled]:pointer-events-none aria-[disabled]:text-darkgrey data-[selected]:border-b-black data-[selected]:bg-grey"
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
          <Text tag="div">{s("ctas.next", strings)}</Text>
        </Link>
      </div>
    </I18nProvider>
  );
};

export default ReserveDate;
