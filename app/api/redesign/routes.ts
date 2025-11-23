import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { style, description } = await req.json();

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an interior design expert. Provide helpful, beautiful redesigns."
      },
      {
        role: "user",
        content: `
Redesign the user's room.

Style: ${style}
Room Description: ${description}

Return a design plan:
- Color palette (hex values)
- Furniture suggestions
- Layout improvements
- Materials & textures
- Lighting plan
- Optional decor tips
`
      }
    ]
  });

  return NextResponse.json({
    output: completion.choices[0].message.content
  });
}
