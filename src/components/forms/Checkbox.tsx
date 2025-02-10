import {
  Label,
  FieldError,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
} from "react-aria-components";
import Text from "@/components/elements/Text";

type Props = CheckboxGroupProps & {
  label?: string;
  ariaLabel?: string;
  options: { text?: string; value: string }[];
  required?: boolean;
};

const FormsCheckbox = ({
  name,
  label,
  ariaLabel,
  options,
  value,
  onChange,
  required = false,
}: Props) => {
  return (
    <CheckboxGroup
      name={name}
      isRequired={required}
      className="gap-xs grid"
      aria-label={ariaLabel}
      value={value}
      onChange={onChange}
    >
      {label && <Label className="text-base">{label}</Label>}
      {options.map(({ text, value }) => (
        <Checkbox value={value} key={value} className="cursor-pointer">
          {({ isSelected }) => (
            <div className="gap-xs grid grid-flow-col grid-cols-[auto_1fr] items-center">
              <div className="bg-grey p-xs">
                <div className={isSelected ? "visible" : "invisible"}>
                  <Text typo="input">√</Text>
                </div>
              </div>
              <div className="w-min min-w-full">
                <Text typo="base">{text}</Text>
              </div>
            </div>
          )}
        </Checkbox>
      ))}
      <div className="grid *:col-start-1 *:row-start-1">
        <div className="text-sm">&nbsp;</div>
        <FieldError className="text-orange text-sm" />
      </div>
    </CheckboxGroup>
  );
};

export default FormsCheckbox;
