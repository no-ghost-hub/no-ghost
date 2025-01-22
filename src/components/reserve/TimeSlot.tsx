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
  const past =
    now.getHours() > hours ||
    (now.getHours() === hours && now.getMinutes() >= minutes);

  return (
    <Radio
      value={JSON.stringify(time)}
      className="custom-underline cursor-pointer data-[disabled]:pointer-events-none data-[selected]:bg-grey data-[disabled]:text-darkgrey"
      isDisabled={!availableTables?.length || past}
    >
      <div className="grid grid-flow-col items-end justify-between p-xs">
        <Text tag="div">{time.from}</Text>
        <Text tag="div" typo="note" wrap={false}>
          {availableTables?.length
            ? `${s("reserve.to")} ${time.to}`
            : `${s("reserve.booked")}`}
        </Text>
      </div>
    </Radio>
  );
};

export default TimeSlot;
