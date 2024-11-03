import { NextResponse } from "next/server";

import pageQuery from "@/graphql/queries/page";
import menuQuery from "@/graphql/queries/menu";

import parsed from "@/utils/parsed";

const endpoint = process.env.NEXT_PUBLIC_PAYLOAD_API_ENDPOINT;
const queries: Record<string, any> = {
  Pages: pageQuery,
  Menus: menuQuery,
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string; slug: string }> },
) {
  const { type, slug } = await params;

  if (endpoint) {
    let response;

    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queries[type],
        variables: {
          slug,
        },
      }),
    });

    response = await response.json();
    const { data, errors } = response;

    if (errors) {
      console.log(errors);
    }

    if (data) {
      response.data = parsed(data[type].docs[0], type);
    }

    return NextResponse.json(response);
  }
}
