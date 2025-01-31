"use client";

import { Radio } from "react-aria-components";
import Text from "@/components/elements/Text";
import { s } from "@/utils/useClientString";
import useSWR from "swr";
import useOdoo from "@/utils/useOdoo";

type Props = {
  guests: number;
  date: string;
  time: { from: string; to: string };
  timeZone: string;
};

const TimeSlot = ({ guests = 0, date = "", time, timeZone }: Props) => {
  const { data: availableTables } = useSWR(
    {
      route: "available-tables",
      method: "POST",
      body: JSON.stringify({ date, time, guests, timeZone }),
    },
    useOdoo,
  );

  const [hours, minutes] = time.from.split(":").map(Number);
  const now = new Date();
  const future = new Date(date).getTime() > now.getTime();

  const past =
    !future &&
    (now.getHours() > hours ||
      (now.getHours() === hours && now.getMinutes() >= minutes));

  return (
    <Radio
      value={JSON.stringify(time)}
      className="custom-underline data-selected:bg-grey data-disabled:text-darkgrey cursor-pointer data-disabled:pointer-events-none"
      isDisabled={!availableTables?.length}
    >
      <div className="p-xs grid grid-flow-col items-end justify-between">
        <Text tag="div">{time.from}</Text>
        <Text tag="div" typo="sm" wrap={false}>
          {availableTables?.length
            ? `${s("reserve.to")} ${time.to}`
            : `${s("reserve.booked")}`}
        </Text>
      </div>
    </Radio>
  );
};

export default TimeSlot;
