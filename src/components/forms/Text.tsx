import {
  Input,
  TextField,
  Label,
  FieldError,
  TextArea,
  TextFieldProps,
} from "react-aria-components";

type Props = TextFieldProps & {
  label?: string;
  required?: boolean;
};

const FormsText = ({
  name,
  label,
  type = "text",
  required = false,
  value,
  onChange,
}: Props) => {
  return (
    <TextField
      name={name}
      isRequired={required}
      className="gap-xs grid"
      type={type === "textarea" ? "text" : type}
      value={value}
      onChange={onChange}
    >
      <Label className="text-base">{label}</Label>
      <div className="custom-underline bg-grey p-xs text-input">
        {type === "textarea" ? (
          <TextArea className="w-full resize-none" rows={4} />
        ) : (
          <Input size={1} className="w-full" />
        )}
      </div>
      <div className="grid *:col-start-1 *:row-start-1">
        <div className="text-sm">&nbsp;</div>
        <FieldError className="text-orange text-sm" />
      </div>
    </TextField>
  );
};

export default FormsText;
