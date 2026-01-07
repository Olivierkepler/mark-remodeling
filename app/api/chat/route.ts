import { NextResponse } from "next/server";
import OpenAI from "openai";
import mockData from "@/data/mock.json";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatRole = "system" | "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ChatRequestBody = {
  messages?: ChatMessage[];
};

// Helps us safely build an error message without using `any`
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Unknown error";
  }
}

export async function POST(req: Request) {
  try {
    const body: ChatRequestBody = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    // Convert front-end messages to OpenAI format (typed, no `any`)
    const formattedMessages: ChatMessage[] = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    /* -------------------------------------------------------------------
       SYSTEM PROMPT: Company Data + Auto Quote Generator Logic
    ------------------------------------------------------------------- */
    formattedMessages.unshift({
      role: "system",
      content: `
You are the AI assistant for **Mark-Remodeling**, a professional home renovation company.

Your responsibilities:

1. Use ONLY the official company data provided below when answering questions about:
   - Services
   - Pricing
   - Service areas
   - Warranty
   - FAQs
   - Contact details
   - Process
   - Promotions

2. If the user asks for a **QUOTE** or **ESTIMATE**, follow the Auto Quote Generator Rules:

=================== AUTO QUOTE GENERATOR RULES ===================

If the user requests an estimate:
- Ask for missing details:
   • project type (kitchen, bathroom, flooring, etc.)
   • square footage
   • material level (basic, standard, premium)
- Use the pricing rules from mockData.quotePricing:
     baseCostPerSqFt × materialMultiplier
- Produce:
   • Detailed cost breakdown
   • Low–high range (low = total × 0.9, high = total × 1.15)
   • Timeline estimate
   • Factors that affect cost
   • A friendly call to action

Never guess numbers — use ONLY the pricing from the JSON.

=================================================================

===== BEGIN COMPANY DATA =====
${JSON.stringify(mockData, null, 2)}
===== END COMPANY DATA =====
`,
    });

    // OpenAI request
    const completion = await client.chat.completions.create({
      model: "gpt-4.1",
      messages: formattedMessages,
      temperature: 0.7,
    });

    const reply =
      completion.choices?.[0]?.message?.content ??
      "I'm not sure how to respond to that.";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.error("Chat API error:", error);

    return NextResponse.json(
      { error: "Server error: " + errorMessage },
      { status: 500 }
    );
  }
}
