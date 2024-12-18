"use client";

import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import { String } from "@/payload-types";
import { Reservation } from "@/types";
import { usePathname } from "next/navigation";
import formatDate from "@/utils/formatDate";

type Props = {
  strings: String["strings"];
  reservation?: Reservation;
  error: string;
};

const ReserveResult = ({ strings, reservation, error }: Props) => {
  const pathname = usePathname();

  return (
    <div className="grid grid-rows-[1fr_auto] gap-s">
      <div className="grid gap-s self-center">
        <Text
          tag="h2"
          typo="p"
          align="center"
          color={error ? "orange" : "black"}
        >
          {s(error ? "reserve.error" : "reserve.success", strings)}
        </Text>
        {error ? (
          <Text typo="note" align="center">
            {error}
          </Text>
        ) : (
          reservation && (
            <>
              <Text align="center">
                <br />
                {`${reservation.guests} guests`}
                <br />
                {formatDate(reservation.date || "")}
                <br />
                {reservation.time?.from}
              </Text>
              <Text typo="note" align="center">
                {s("reserve.success.email", strings)}
              </Text>
            </>
          )
        )}
      </div>
      <Link theme="button" background="orange" href={pathname} active={false}>
        <Text tag="div">{s("ctas.close", strings)}</Text>
      </Link>
    </div>
  );
};

export default ReserveResult;
