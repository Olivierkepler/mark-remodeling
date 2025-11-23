import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert interior designer. Analyze the uploaded room photo and provide redesign suggestions."
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Analyze this room and provide a redesign plan." },
          {
            type: "image_url",
            image_url: {
              url: "data:image/jpeg;base64," + Buffer.from(bytes).toString("base64")
            }
          }
        ]
      }
    ]
  });

  return NextResponse.json({
    output: completion.choices[0].message.content
  });
}
