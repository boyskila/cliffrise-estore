import { countryIdMap } from "@/constants";
import { appFetch } from "@/lib/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { city, zipCode } = body;
  const country: string = body.country.toLowerCase();

  try {
    const result = await appFetch<{ sites: { name: string }[] }>(
      "https://api.speedy.bg/v1/location/site",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          countryId: countryIdMap[country as keyof typeof countryIdMap],
          language:
            country === "bulgaria" || country === "българия" ? "bg" : "en",
          userName: process.env.SPEEDY_USERNAME,
          password: process.env.SPEEDY_PASSWORD,
          name: city,
          postCode: zipCode,
        }),
      }
    );
    if (result.sites.length === 0) {
      return NextResponse.json({ error: "City or post code not valid!" });
    }
    return NextResponse.json({ recipientCity: result.sites[0] });
  } catch (error) {
    console.log(error);
  }
}
