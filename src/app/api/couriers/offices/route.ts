import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { appFetch } from "@/lib/fetch";
import { countryIdMap } from "@/constants";

export async function GET() {
  const { get } = cookies();

  const { data } = JSON.parse(get("checkout_data")?.value ?? "{}");
  const { address, recipientCity } = data;
  const country = address.country.toLowerCase();

  try {
    const { offices } = await appFetch<{ offices: [] }>(
      "https://api.speedy.bg/v1/location/office",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryId: countryIdMap[country as keyof typeof countryIdMap],
          language:
            country === "bulgaria" || country === "българия" ? "BG" : "EN",
          userName: process.env.SPEEDY_USERNAME,
          password: process.env.SPEEDY_PASSWORD,
        }),
      }
    );
    return NextResponse.json({ offices, recipientCity });
  } catch (err) {
    return NextResponse.json({ err, status: 500 });
  }
}
