// app/api/photo-analyze/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

// ---- Helper: compress image using sharp (install: `npm i sharp`) ----
import sharp from "sharp";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image too large. Max = 10MB." },
        { status: 400 }
      );
    }

    // Read raw file
    const buffer = Buffer.from(await file.arrayBuffer());

    // ---- COMPRESS IMAGE ↓↓↓ ----
    const compressed = await sharp(buffer)
      .resize({ width: 1024 }) // major cost saver
      .jpeg({ quality: 70 }) // major cost saver
      .toBuffer();

    const base64 = compressed.toString("base64");
    const mimeType = "image/jpeg";

    // ---- AI CALL (cheap model: gpt-4o-mini) ----
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // 🔥 10× cheaper than gpt-4o
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You analyze room photos and estimate dimensions. Respond ONLY with JSON.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
Estimate:
- width (ft)
- length (ft)
- area (sq ft)
- confidence (0–1)
- 1–3 renovation tips
`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64}`,
              },
            },
          ],
        },
      ],
    });

    const json = JSON.parse(completion.choices[0].message.content ?? "{}");

    return NextResponse.json({ analysis: json });
  } catch (err) {
    const error = err as Error;
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Processing failed", details: error.message },
      { status: 500 }
    );
  }
}
