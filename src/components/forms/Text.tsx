import {
  Input,
  TextField,
  Label,
  FieldError,
  TextArea,
} from "react-aria-components";
import { TextInputDOMProps } from "@react-types/shared/src/dom";

type Props = {
  name: string;
  label: string;
  type?: TextInputDOMProps["type"];
  required?: boolean;
};

const FormsText = ({ name, label, type = "text", required = false }: Props) => {
  return (
    <TextField
      name={name}
      isRequired={required}
      className="grid gap-xs"
      type={type === "textarea" ? "text" : type}
    >
      <Label className="typo-p">{label}</Label>
      <div className="custom-underline bg-grey p-xs typo-input">
        {type === "textarea" ? (
          <TextArea className="w-full resize-none" rows={4} />
        ) : (
          <Input size={1} className="w-full" />
        )}
      </div>
      <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
        <div className="typo-note">&nbsp;</div>
        <FieldError className="text-orange typo-note" />
      </div>
    </TextField>
  );
};

export default FormsText;
