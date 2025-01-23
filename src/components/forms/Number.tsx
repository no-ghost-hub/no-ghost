import { NumberField, Group, Button, Input } from "react-aria-components";
import Text from "@/components/elements/Text";

type Props = {
  min?: number;
  max?: number;
  label: string;
  value?: number;
  onChange: (value: number) => void;
};

const FormsNumber = ({ min, max, label, value, onChange }: Props) => {
  return (
    <NumberField
      defaultValue={0}
      minValue={min}
      maxValue={max}
      className="place-self-center"
      aria-label={label}
      value={value || 0}
      onChange={onChange}
    >
      <Group className="grid grid-flow-col">
        <Button
          slot="decrement"
          className="px-xs hover:text-orange disabled:text-darkgrey"
        >
          <Text tag="div" typo="2">
            –
          </Text>
        </Button>
        <div className="py-xs typo-input">
          <Input size={1} className="text-center" />
        </div>
        <Button
          slot="increment"
          className="px-xs hover:text-orange disabled:text-darkgrey"
        >
          <Text tag="div" typo="2">
            +
          </Text>
        </Button>
      </Group>
    </NumberField>
  );
};

export default FormsNumber;
