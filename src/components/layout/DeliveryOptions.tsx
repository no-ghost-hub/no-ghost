"use client";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import NavigationToggleContainer from "@/components/utils/NavigationToggleContainer";
import { useUiStore } from "@/components/providers/Global";

type Props = {};

const options = [
  // { name: "Takeaway.com", url: "https://takeaway.com" },
  // { name: "Deliveroo", url: "https://deliveroo.com" },
  { name: "Uber Eats", url: "https://www.ubereats.com/be-en/store/no-ghost/" },
];

const DeliveryOptions = ({}: Props) => {
  const { navigation } = useUiStore((state) => state);

  return (
    <NavigationToggleContainer show={navigation === "order"}>
      <nav className={`grid grid-flow-col justify-center bg-green`}>
        {options?.map(({ name, url }) => {
          return (
            <Link theme="button" href={url} key={name}>
              <Text tag="div" wrap={false}>
                {name}
              </Text>
            </Link>
          );
        })}
      </nav>
    </NavigationToggleContainer>
  );
};

export default DeliveryOptions;
