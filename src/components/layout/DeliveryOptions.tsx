import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import DeliveryOptionsContainer from "@/components/utils/DeliveryOptionsContainer";

type Props = {};

const options = [
  { name: "Takeaway.com", url: "https://takeaway.com" },
  { name: "Deliveroo", url: "https://deliveroo.com" },
  { name: "Uber Eats", url: "https://ubereats.com" },
];

const DeliveryOptions = ({}: Props) => {
  return (
    <DeliveryOptionsContainer>
      <nav className={`grid grid-flow-col justify-center bg-green`}>
        {options?.map(({ name, url }) => {
          return (
            <Link theme="button" href={url} key={name}>
              <Text tag="div">{name}</Text>
            </Link>
          );
        })}
      </nav>
    </DeliveryOptionsContainer>
  );
};

export default DeliveryOptions;
