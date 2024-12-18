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
import { String } from "@/payload-types";
import { Reservation } from "@/types";
import useOdoo from "@/utils/useOdoo";
import useSWR from "swr";

type Props = {
  strings: String["strings"];
  times: { from: number; to: number }[];
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
  onNext: () => void;
};

const ReserveGuests = ({
  strings,
  reservation,
  setReservation,
  onNext,
}: Props) => {
  const locale = "en-BE";

  const { data: reservationTypes } = useSWR(
    { route: "reservation-types" },
    useOdoo,
  );

  function handleChange(guests: number) {
    setReservation({ ...reservation, guests });
  }

  return (
    <I18nProvider locale={locale}>
      <div className="grid grid-rows-[1fr_auto] gap-s">
        <NumberField
          defaultValue={0}
          minValue={0}
          maxValue={reservationTypes?.maxCapacity}
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
          <Text tag="div">{s("ctas.next", strings)}</Text>
        </Link>
      </div>
    </I18nProvider>
  );
};

export default ReserveGuests;
