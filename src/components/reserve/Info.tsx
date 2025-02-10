"use client";

import FormsText from "@/components/forms/Text";
import FormsCheckbox from "@/components/forms/Checkbox";

import { s } from "@/utils/useClientString";
import { Reservation } from "@/types";

type Props = {
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
};

const ReserveGuests = ({ reservation, setReservation }: Props) => {
  function handleTextChange(value: string, key: string) {
    setReservation({
      ...reservation,
      info: { ...reservation.info, [key]: value },
    });
  }
  function handleMarketingChange(value: string[]) {
    setReservation({
      ...reservation,
      info: { ...reservation.info, marketing: value.length > 0 },
    });
  }

  return (
    <div className="gap-xs grid self-center">
      <FormsText
        name="firstName"
        label={s("forms.firstName")}
        value={reservation.info?.firstName}
        onChange={(v) => handleTextChange(v, "firstName")}
        required
      />
      <FormsText
        name="lastName"
        label={s("forms.lastName")}
        value={reservation.info?.lastName}
        onChange={(v) => handleTextChange(v, "lastName")}
        required
      />
      <FormsText
        type="email"
        name="email"
        label={s("forms.email")}
        value={reservation.info?.email}
        onChange={(v) => handleTextChange(v, "email")}
        required
      />
      <FormsText
        type="tel"
        name="phone"
        label={s("forms.phone")}
        value={reservation.info?.phone}
        onChange={(v) => handleTextChange(v, "phone")}
        required
      />
      <FormsText
        type="textarea"
        name="message"
        value={reservation.info?.message}
        label={s("forms.reserve.message")}
        onChange={(v) => handleTextChange(v, "textarea")}
      />
      <FormsCheckbox
        name="marketing"
        ariaLabel="Marketing subscription"
        value={reservation.info?.marketing ? ["subscribe"] : []}
        onChange={handleMarketingChange}
        options={[{ text: s("forms.marketing"), value: "subscribe" }]}
      />
    </div>
  );
};

export default ReserveGuests;
