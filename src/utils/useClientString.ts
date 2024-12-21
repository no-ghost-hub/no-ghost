import { String } from "@/payload-types";
import Context from "@/components/utils/Context";
import { useContext } from "react";

const s = (key: string) => {
  const { strings }: { strings: String["strings"] } = useContext(Context);
  const string = strings?.find((s) => s.key === key);
  return string?.value || key;
};

export { s };
