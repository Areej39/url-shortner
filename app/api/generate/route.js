import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "URL Shortener API is running",
  });
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (
      typeof body.url !== "string" ||
      typeof body.shorturl !== "string" ||
      !body.url.trim() ||
      !body.shorturl.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid URL and shorturl are required.",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("url-shortner");
    const collection = db.collection("url");

    const url = body.url.trim();
    const shorturl = body.shorturl.trim();

    const existingDoc = await collection.findOne({ shorturl });

    if (existingDoc) {
      return NextResponse.json(
        {
          success: false,
          message: "URL already exists!",
        },
        { status: 409 }
      );
    }

    await collection.insertOne({
      url,
      shorturl,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "URL generated successfully",
    });
  } catch (error) {
    console.error("POST /api/generate error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate URL. Check the server terminal.",
      },
      { status: 500 }
    );
  }
}
