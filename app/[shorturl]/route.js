
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { shorturl } = await params;

    const client = await clientPromise;
    const collection = client
      .db("url-shortner")
      .collection("url");

    const record = await collection.findOne({
      shorturl: shorturl.toLowerCase(),
    });

    if (!record) {
      return new Response("Short link not found!", {
        status: 404,
      });
    }

    let destination;

    try {
      destination = new URL(record.url);
    } catch {
      return new Response("Invalid destination URL", {
        status: 500,
      });
    }

    if (!["http:", "https:"].includes(destination.protocol)) {
      return new Response("Invalid destination URL", {
        status: 500,
      });
    }

    return NextResponse.redirect(destination, 307);
  } catch (error) {
    console.error("Short URL redirect error:", error);

    return new Response("Unable to redirect right now", {
      status: 500,
    });
  }
}