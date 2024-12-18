import {
  Label,
  FieldError,
  Checkbox,
  CheckboxGroup,
} from "react-aria-components";
import Text from "@/components/elements/Text";

type Props = {
  name: string;
  label?: string;
  ariaLabel?: string;
  options: { text: string; value: string }[];
  required?: boolean;
};

const FormsText = ({
  name,
  label,
  ariaLabel,
  options,
  required = false,
}: Props) => {
  return (
    <CheckboxGroup
      name={name}
      isRequired={required}
      className="grid gap-xs"
      aria-label={ariaLabel}
    >
      {label && <Label className="typo-p">{label}</Label>}
      {options.map(({ text, value }) => (
        <Checkbox value={value} key={value} className="cursor-pointer">
          {({ isSelected }) => (
            <div className="grid grid-flow-col grid-cols-[auto_1fr] items-center gap-xs">
              <div className="bg-grey p-xs">
                <div className={isSelected ? "visible" : "invisible"}>
                  <Text typo="input">√</Text>
                </div>
              </div>
              <div className="w-min min-w-full">
                <Text typo="input">{text}</Text>
              </div>
            </div>
          )}
        </Checkbox>
      ))}
      <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
        <div className="typo-note">&nbsp;</div>
        <FieldError className="text-orange typo-note" />
      </div>
    </CheckboxGroup>
  );
};

export default FormsText;
