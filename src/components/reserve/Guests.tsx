"use client";

import {
  NumberField,
  Group,
  Button,
  Input,
  I18nProvider,
} from "react-aria-components";
import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import { Reservation } from "@/types";
import { useContext } from "react";
import Context from "@/components/utils/Context";

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
        <NumberField
          defaultValue={0}
          minValue={0}
          maxValue={reservationTypes.maxCapacity}
          className="place-self-center"
          aria-label="Reservation guests"
          value={reservation.guests || 0}
          onChange={handleChange}
        >
          <Group className="grid grid-flow-col">
            <Button
              slot="decrement"
              className="px-s hover:text-orange disabled:text-darkgrey"
            >
              <Text tag="div" typo="2">
                –
              </Text>
            </Button>
            <div className="p-xs typo-input">
              <Input size={1} className="text-center" />
            </div>
            <Button
              slot="increment"
              className="px-s hover:text-orange disabled:text-darkgrey"
            >
              <Text tag="div" typo="2">
                +
              </Text>
            </Button>
          </Group>
        </NumberField>
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
