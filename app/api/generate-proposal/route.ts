import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";
import { InquiryFormData } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const formData: InquiryFormData = await request.json();
    const client = new Anthropic();

    const stream = client.messages.stream({
      model: "claude-sonnet-4-0",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(formData) }],
    });

    const encoder = new TextEncoder();

    return new Response(
      new ReadableStream({
        async start(controller) {
          stream.on("text", (text) => {
            controller.enqueue(encoder.encode(text));
          });

          stream.on("error", (err) => {
            console.error("Stream error:", err);
            controller.error(err);
          });

          stream.on("end", () => {
            controller.close();
          });
        },
      }),
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
        },
      }
    );
  } catch {
    return Response.json(
      { error: "Failed to generate proposal. Please try again." },
      { status: 500 }
    );
  }
}
