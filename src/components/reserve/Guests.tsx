"use client";

import { I18nProvider } from "react-aria-components";
import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import { Reservation } from "@/types";
import { useContext } from "react";
import Context from "@/components/utils/Context";
import FormsNumber from "@/components/forms/Number";

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

  const { reservationTypes } = useContext(Context);

  return (
    <I18nProvider locale={locale}>
      <div className="grid grid-rows-[1fr_auto] gap-s">
        <FormsNumber
          min={0}
          max={reservationTypes.maxCapacity}
          label="Reservation guests"
          value={reservation.guests || 0}
          onChange={handleChange}
        />
        <Link
          theme="button"
          background="orange"
          disabled={!reservation.guests}
          onClick={onNext}
        >
          <Text tag="div">{s("ctas.next")}</Text>
        </Link>
      </div>
    </I18nProvider>
  );
};

export default ReserveGuests;
