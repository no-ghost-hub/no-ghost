"use client";

import Text from "@/components/elements/Text";

import { Reservation } from "@/types";

import { useContext } from "react";
import Context from "@/components/utils/Context";
import { ToggleButton, ToggleButtonGroup } from "react-aria-components";

type Props = {
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
};

const ReserveGuests = ({ reservation, setReservation }: Props) => {
  const { tables } = useContext(Context);

  function handleChange(keys: Set<number>) {
    setReservation({ ...reservation, guests: Array.from(keys)[0] });
  }

  return (
    <div className="gap-m grid self-center">
      <ToggleButtonGroup
        className="grid grid-cols-4 justify-self-center"
        onSelectionChange={(keys) => handleChange(keys as Set<number>)}
        selectedKeys={[reservation.guests]}
        aria-label="Reservation guests"
        disallowEmptySelection={true}
      >
        {[...Array(tables.maxCapacity)].map((_, index) => (
          <ToggleButton
            key={index + 1}
            id={index + 1}
            className="custom-underline data-selected:bg-grey p-s cursor-pointer"
          >
            <Text tag="div" typo="md" wrap={false}>
              {index + 1}
            </Text>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Text typo="sm" align="center">
        To reserve for more than {tables.maxCapacity} guests, please contact us.
      </Text>
    </div>
  );
};

export default ReserveGuests;
