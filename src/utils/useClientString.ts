import { String } from "@/payload-types";

const s = (key: string, strings: String["strings"]) => {
  const string = strings?.find((s) => s.key === key);

  return string?.value || key;
};

export { s };
