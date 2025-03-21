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
          <Text tag="div" typo="md">
            –
          </Text>
        </Button>
        {(!max || max > 1) && (
          <>
            <div className="py-xs text-base">
              <Input size={1} className="w-full text-center" />
            </div>
            <Button
              slot="increment"
              className="px-xs hover:text-orange disabled:text-darkgrey"
            >
              <Text tag="div" typo="md">
                +
              </Text>
            </Button>
          </>
        )}
      </Group>
    </NumberField>
  );
};

export default FormsNumber;
