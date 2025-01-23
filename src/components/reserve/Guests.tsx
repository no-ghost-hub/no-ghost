"use client";

import { I18nProvider } from "react-aria-components";
import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import { Reservation } from "@/types";
import FormsNumber from "@/components/forms/Number";
import useSWR from "swr";
import useOdoo from "@/utils/useOdoo";

type Props = {
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
  onNext: () => void;
};

const ReserveGuests = ({ reservation, setReservation, onNext }: Props) => {
  const locale = "en-BE";

  function handleChange(guests: number) {
    setReservation({ ...reservation, guests });
  }

  const { data: tables, isLoading } = useSWR({ route: "tables" }, useOdoo);

  return (
    <I18nProvider locale={locale}>
      <div className="gap-s grid grid-rows-[1fr_auto]">
        {!isLoading && (
          <FormsNumber
            min={0}
            max={tables.maxCapacity}
            label="Reservation guests"
            value={reservation.guests || 0}
            onChange={handleChange}
          />
        )}
        <div className="gap-s grid">
          {!isLoading && (
            <Text typo="sm" align="center">
              To reserve for more than {tables.maxCapacity} guests, please
              contact us.
            </Text>
          )}
          <Link
            theme="button"
            background="orange"
            disabled={!reservation.guests}
            onClick={onNext}
          >
            <Text tag="div">{s("ctas.next")}</Text>
          </Link>
        </div>
      </div>
    </I18nProvider>
  );
};

export default ReserveGuests;
