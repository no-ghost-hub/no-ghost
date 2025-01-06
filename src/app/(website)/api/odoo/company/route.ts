import { odooQuery } from "@/utils/odooClient";
import { NextResponse } from "next/server";
import parsed from "@/utils/parsed";

export async function GET() {
  let response;
  response = await odooQuery({
    model: "res.company",
    method: "search_read",
    options: {
      fields: ["currency_id"],
    },
  });

  const { result: companyData } = response;

  if (companyData) {
    response.result = parsed(companyData[0], "company");
  }

  return NextResponse.json(response);
}
