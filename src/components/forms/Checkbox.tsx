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
  selected?: string[];
  required?: boolean;
};

const FormsCheckbox = ({
  name,
  label,
  ariaLabel,
  options,
  selected = [],
  required = false,
}: Props) => {
  return (
    <CheckboxGroup
      name={name}
      isRequired={required}
      className="grid gap-xs"
      aria-label={ariaLabel}
      defaultValue={selected}
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
                <Text typo="p">{text}</Text>
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

export default FormsCheckbox;
