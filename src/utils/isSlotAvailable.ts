import useSWR from "swr";
import useOdoo from "@/utils/useOdoo";

export const isSlotAvailable = async (
  guests: number,
  date: string,
  time: { from: string; to: string },
) => {
  return false;
};
