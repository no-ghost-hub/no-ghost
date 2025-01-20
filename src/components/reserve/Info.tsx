"use client";

import { I18nProvider, Form } from "react-aria-components";
import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";
import FormsText from "@/components/forms/Text";
import FormsCheckbox from "@/components/forms/Checkbox";

import { s } from "@/utils/useClientString";
import { Reservation } from "@/types";

type Props = {
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
};

const ReserveGuests = ({ reservation, setReservation }: Props) => {
  const locale = "en-BE";

  function handleSubmit(data: FormData) {
    setReservation({ ...reservation, info: Object.fromEntries(data) });
  }

  return (
    <I18nProvider locale={locale}>
      <Form className="grid grid-rows-[1fr_auto] gap-s" action={handleSubmit}>
        <div className="grid gap-xs self-center">
          <FormsText name="firstName" label={s("forms.firstName")} required />
          <FormsText name="lastName" label={s("forms.lastName")} required />
          <FormsText
            type="email"
            name="email"
            label={s("forms.email")}
            required
          />
          <FormsText
            type="tel"
            name="phone"
            label={s("forms.phone")}
            required
          />
          <FormsText
            type="textarea"
            name="message"
            label={s("forms.reserve.message")}
          />
          <FormsCheckbox
            name="marketing"
            ariaLabel="Marketing subscription"
            selected={["subscribe"]}
            options={[
              {
                text: s("forms.marketing"),
                value: "subscribe",
              },
            ]}
          />
        </div>
        <Link theme="button" background="orange">
          <Text tag="div">{s("ctas.confirm")}</Text>
        </Link>
      </Form>
    </I18nProvider>
  );
};

export default ReserveGuests;
