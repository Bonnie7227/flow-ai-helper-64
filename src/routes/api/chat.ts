import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getGateway, DEFAULT_MODEL } from "@/lib/ai-gateway.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) {
          return new Response("Messages required", { status: 400 });
        }
        const gateway = getGateway();
        const result = streamText({
          model: gateway(DEFAULT_MODEL),
          system: `You are Lumen, an AI workplace productivity assistant. Be concise, professional, and action-oriented. Use Markdown formatting (lists, bold, tables) when helpful. When the user asks for drafts (emails, plans, summaries), produce the artifact directly without preamble. Always remind users to review AI output for accuracy when stakes are high.`,
          messages: await convertToModelMessages(messages),
        });
        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
