"use client";

import { I18nProvider, Form } from "react-aria-components";
import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";
import FormsText from "@/components/forms/Text";
import FormsCheckbox from "@/components/forms/Checkbox";

import { s } from "@/utils/useClientString";
import { String } from "@/payload-types";
import { Reservation } from "@/types";

type Props = {
  strings: String["strings"];
  times: { from: number; to: number }[];
  reservation: Reservation;
  setReservation: (value: Reservation) => void;
  onNext: () => void;
};

const ReserveGuests = ({ strings, reservation, setReservation }: Props) => {
  const locale = "en-BE";

  function handleSubmit(data: FormData) {
    setReservation({ ...reservation, info: Object.fromEntries(data) });
  }

  return (
    <I18nProvider locale={locale}>
      <Form className="grid grid-rows-[1fr_auto] gap-s" action={handleSubmit}>
        <div className="grid gap-xs self-center">
          <FormsText
            name="firstName"
            label={s("forms.firstName", strings)}
            required
          />
          <FormsText
            name="lastName"
            label={s("forms.lastName", strings)}
            required
          />
          <FormsText
            type="email"
            name="email"
            label={s("forms.email", strings)}
            required
          />
          <FormsText
            type="tel"
            name="phone"
            label={s("forms.phone", strings)}
            required
          />
          <FormsText
            type="textarea"
            name="message"
            label={s("forms.reserve.message", strings)}
          />
          <FormsCheckbox
            name="newsletter"
            ariaLabel="Newsletter subscription"
            options={[
              { text: s("forms.newsletter", strings), value: "subscribe" },
            ]}
          />
        </div>
        <Link theme="button" background="orange">
          <Text tag="div">{s("ctas.confirm", strings)}</Text>
        </Link>
      </Form>
    </I18nProvider>
  );
};

export default ReserveGuests;
