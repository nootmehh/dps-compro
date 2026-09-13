import { NextResponse } from "next/server";
import { getSeoSettings } from "@/api/seo";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const seo = await getSeoSettings();
    const faviconUrl = seo?.favicon_url?.trim();

    if (faviconUrl) {
      if (faviconUrl.startsWith("http://") || faviconUrl.startsWith("https://")) {
        const res = await fetch(faviconUrl, { cache: "no-store" });
        if (res.ok) {
          const contentType = res.headers.get("content-type") || "image/webp";
          const data = await res.arrayBuffer();
          return new NextResponse(data, {
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=60, s-maxage=60",
            },
          });
        }
      }
      return NextResponse.redirect(new URL(faviconUrl, request.url), 302);
    }
  } catch (err) {
    console.error("Error serving dynamic favicon:", err);
  }

  return NextResponse.redirect(new URL("/default-favicon.ico", request.url), 302);
}
