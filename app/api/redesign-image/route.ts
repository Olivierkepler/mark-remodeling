import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "nodejs"; // ensure Buffer is available

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const style = (formData.get("style") as string | null) || "";

    if (!file) {
      return NextResponse.json(
        { error: "No image uploaded" },
        { status: 400 }
      );
    }

    if (!style) {
      return NextResponse.json(
        { error: "No design style provided" },
        { status: 400 }
      );
    }

    // Prompt engineering for redesign
    const prompt = `
Redesign this interior room in the following style: "${style}".

Keep the architectural structure of the room (windows, doors, walls) but:
- Update furniture, materials, and decor to match the style
- Adjust color palette, textures, and lighting
- Make it look realistic, well lit, and magazine-quality
- Preserve camera angle and perspective

Output a single high-quality interior render.
`;

    // Call OpenAI image generation
    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      // Note: If image input is needed in the future, uncomment below:
      // const arrayBuffer = await file.arrayBuffer();
      // const base64Image = Buffer.from(arrayBuffer).toString("base64");
      // image: [{ data: base64Image, mime_type: file.type }],
    });

    const imageBase64 = response.data?.[0]?.b64_json;
    if (!imageBase64) {
      return NextResponse.json(
        { error: "No image returned from AI" },
        { status: 500 }
      );
    }

    // Turn base64 into a data URL the frontend can render directly
    const imageUrl = `data:image/png;base64,${imageBase64}`;

    return NextResponse.json({ imageUrl });
  } catch (err) {
    console.error("redesign-image error:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to generate redesign image";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
