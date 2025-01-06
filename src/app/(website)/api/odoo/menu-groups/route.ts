import { odooQuery } from "@/utils/odooClient";
import { NextResponse } from "next/server";
import parsed from "@/utils/parsed";

const customFields = {
  groupSlug: "x_studio_char_field_41e_1icocg5tb",
};

export async function GET() {
  let response;
  response = await odooQuery({
    model: "pos.category",
    method: "search_read",
    options: {
      fields: [
        "name",
        customFields.groupSlug,
        "hour_after",
        "hour_until",
        "color",
      ],
    },
  });

  const { result: data } = response;

  if (data) {
    response.result = data.map((group: any) => parsed(group, "menuGroup"));
  }

  return NextResponse.json(response);
}
