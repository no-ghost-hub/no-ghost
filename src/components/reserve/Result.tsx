"use client";

import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";

import { s } from "@/utils/useClientString";
import { Reservation } from "@/types";
import formatDate from "@/utils/formatDate";
import { useUiStore } from "@/components/providers/Global";

type Props = {
  reservation?: Reservation;
  error?: string;
};

const ReserveResult = ({ reservation, error }: Props) => {
  const { setNavigation } = useUiStore((state) => state);

  return (
    <div className="gap-s grid grid-rows-[1fr_auto]">
      <div className="gap-s grid self-center">
        <Text
          tag="h2"
          typo="base"
          align="center"
          color={error ? "orange" : "black"}
        >
          {s(error ? "reserve.error" : "reserve.success")}
        </Text>
        {error ? (
          <Text typo="sm" align="center">
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
              <Text typo="base" align="center">
                {s("reserve.success.email")}
              </Text>
            </>
          )
        )}
      </div>
      <Link
        theme="button"
        background="orange"
        onClick={() => setNavigation("")}
        active={false}
      >
        <Text tag="div">{s("ctas.close")}</Text>
      </Link>
    </div>
  );
};

export default ReserveResult;
