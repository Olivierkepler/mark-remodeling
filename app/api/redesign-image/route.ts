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
      // We use the uploaded image as a reference via image[] input if supported,
      // but if your account doesn't support that yet, you can start with pure prompt.
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
  } catch (err: any) {
    console.error("redesign-image error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate redesign image" },
      { status: 500 }
    );
  }
}
