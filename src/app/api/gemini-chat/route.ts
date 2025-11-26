import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const MODELS = ["gemini-1.5-flash", "gemini-1.5-pro"];

const SYSTEM_INSTRUCTION = `
You are a concise, polite AI assistant for JoinQuran.

Always start with:
**اَلسَّلَامُ عَلَيْكُم\n**

RULES:
• Be short, clear, and helpful
• Keep replies under 3-4 sentences
• **Fees (Monthly):**
  - Starts from **£20 (GBP)** or **$25 (USD)** for 2 days/week
  - Up to **£35 (GBP)** or **$50 (USD)** for 6 days/week
• **Duration (Daily-Class):**
  - Starts from **25 minutes** to **30 minutes** per person
• **Links:** Always provide clear, clickable links:
  - [View Fees](https://first-join-quran.vercel.app/fees)
  - [Contact Us](https://first-join-quran.vercel.app/contact us)
  - [Main Website](https://www.joinquran.com/)
• **General Information:** Always provide clear, short answers:
  - Web Search for universal information
  - Provide clear, concise answers about General knowledge

If unsure, send user to Contact Us.

End with:
"Send us your query in the [Contact Us](https://first-join-quran.vercel.app/contact) section — we will get back to you soon, in shā’ Allāh."
`;


export async function POST(req: Request) {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GOOGLE_API_KEY is not defined" },
                { status: 500 }
            );
        }

        const { input } = await req.json();

        if (!input || typeof input !== "string") {
            return NextResponse.json(
                { error: "Valid 'input' is required" },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        let lastError: unknown = null;

        // Try models one by one (2.5 -> 1.5 fallback)
        for (const modelName of MODELS) {
            try {
                const model = genAI.getGenerativeModel({
                    model: modelName,
                    systemInstruction: SYSTEM_INSTRUCTION
                });

                const result = await model.generateContent(input);
                const response = result.response;
                const text = response.text();

                return NextResponse.json({
                    model_used: modelName,
                    output_text: text
                });

            } catch (err) {
                console.warn(`Model failed: ${modelName}`, err);
                lastError = err;
            }
        }

        throw lastError;

    } catch (error: unknown) {
        console.error("Gemini API Error:", error);

        let errorMessage = "Failed to generate response";

        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === "string") {
            errorMessage = error;
        } else {
            try {
                const str = JSON.stringify(error);
                if (str && str !== "{}") {
                    errorMessage = str;
                }
            } catch {
                errorMessage = "Unknown non-serializable error";
            }
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
