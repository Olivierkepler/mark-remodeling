import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { room, width, length, material, budget, summary } = body;

    const prompt = `
You are a professional home renovation consultant.
The user is planning a renovation project. Based on the details below, provide:

1. A short explanation of whether the budget is realistic.
2. Specific material suggestions (quality tiers: budget, mid-range, premium).
3. Practical tips (prep, installation, things people forget).
4. 1–2 ways they could reduce cost while keeping good quality.

Project details:
- Room type: ${room}
- Dimensions: ${width} ft x ${length} ft
- Area: ${summary?.area} sq ft
- Chosen material: ${material}
- Estimated material cost: $${summary?.materialCost?.toFixed?.(2)}
- Estimated labor cost: $${summary?.laborCost?.toFixed?.(2)}
- Total cost: $${summary?.totalCost?.toFixed?.(2)}
- User budget: $${budget}
- Fits budget: ${summary?.fitsBudget ? "yes" : "no"}

Respond in clear bullet points, friendly and concise.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert renovation planner who explains things clearly and practically.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
    });

    const advice = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ advice });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate advice" },
      { status: 500 }
    );
  }
}
