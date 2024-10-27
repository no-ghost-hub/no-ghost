import { NextResponse } from "next/server";
import parsed from "@/utils/parsed";

const endpoint = process.env.FOODICS_API_ENDPOINT;
const token = process.env.FOODICS_ACCESS_TOKEN;

export async function GET() {
  let response = await fetch(`${endpoint}/settings`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const { data } = await response.json();

  return NextResponse.json(parsed(data, "settings"));
}
