import { NextResponse } from "next/server";

import footerQuery from "@/graphql/queries/footer";
import stringsQuery from "@/graphql/queries/strings";

const endpoint = process.env.NEXT_PUBLIC_PAYLOAD_API_ENDPOINT;
const queries: Record<string, any> = {
  Footer: footerQuery,
  Strings: stringsQuery,
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> },
) {
  const { type } = await params;
  console.log(type, "type");

  let response;
  let data;

  if (endpoint) {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queries[type],
      }),
    });

    data = await response.json();

    if (data) {
      data = data.data?.[type];
    }

    return NextResponse.json(data);
  }
}
