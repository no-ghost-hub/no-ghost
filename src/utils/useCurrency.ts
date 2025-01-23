import { Context } from "@/components/providers/Global";
import { useContext } from "react";

const useCurrency = () => {
  const { currency } = useContext(Context);
  return currency;
};
export default useCurrency;
