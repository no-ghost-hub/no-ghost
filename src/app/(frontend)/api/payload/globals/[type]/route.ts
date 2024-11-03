import { NextResponse } from "next/server";

import footerQuery from "@/graphql/queries/footer";
import stringsQuery from "@/graphql/queries/strings";
import siteQuery from "@/graphql/queries/site";

import parsed from "@/utils/parsed";

const endpoint = process.env.NEXT_PUBLIC_PAYLOAD_API_ENDPOINT;
const queries: Record<string, any> = {
  Footer: footerQuery,
  Strings: stringsQuery,
  Site: siteQuery,
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> },
) {
  const { type } = await params;

  if (endpoint) {
    let response;

    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queries[type],
      }),
    });

    response = await response.json();
    const { data, errors } = response;

    if (errors) {
      console.log(errors);
    }

    if (data) {
      response.data = parsed(data[type], type);
    }

    return NextResponse.json(response);
  }
}
