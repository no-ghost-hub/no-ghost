import {
  Input,
  TextField,
  Label,
  FieldError,
  TextArea,
  TextFieldProps,
} from "react-aria-components";

type Props = TextFieldProps & {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  validation?: boolean;
};

const FormsText = ({
  name,
  label,
  showLabel = true,
  type = "text",
  required = false,
  validation = true,
  value,
  onChange,
}: Props) => {
  return (
    <TextField
      aria-label={label}
      name={name}
      isRequired={required}
      className="gap-xs grid"
      type={type === "textarea" ? "text" : type}
      value={value}
      onChange={onChange}
    >
      {showLabel && <Label className="text-base">{label}</Label>}
      <div className="custom-underline bg-grey p-xs text-input">
        {type === "textarea" ? (
          <TextArea className="w-full resize-none" rows={4} />
        ) : (
          <Input size={1} className="w-full" />
        )}
      </div>
      {validation && (
        <div className="grid *:col-start-1 *:row-start-1">
          <div className="text-sm">&nbsp;</div>
          <FieldError className="text-orange text-sm" />
        </div>
      )}
    </TextField>
  );
};

export default FormsText;
