import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Loader2, Plus, User } from "lucide-react";
import { toast } from "sonner";

import { PageShell } from "@/components/page-shell";
import { Disclaimer } from "@/components/disclaimer";
import { Markdown } from "@/components/markdown";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — Lumen" },
      { name: "description", content: "Conversational AI for drafting, brainstorming, and Q&A." },
    ],
  }),
  component: ChatPage,
});

const transport = new DefaultChatTransport({ api: "/api/chat" });

const STARTERS = [
  "Draft a polite follow-up to a client who hasn't responded in a week.",
  "Help me prep talking points for a 1:1 with my manager about a raise.",
  "Brainstorm names for an internal AI launch initiative.",
  "Summarize the pros and cons of a 4-day workweek for a knowledge team.",
];

function getMessageText(m: UIMessage) {
  return m.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("");
}

function ChatPage() {
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
  const { messages, sendMessage, status, error } = useChat({
    id: sessionId,
    transport,
  });
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [sessionId, status]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (error) toast.error(error.message || "Chat error");
  }, [error]);

  const isLoading = status === "submitted" || status === "streaming";

  async function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    await sendMessage({ text: trimmed });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void submit(input);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submit(input);
    }
  }

  return (
    <PageShell
      title="AI Chat"
      description="Iterate on drafts, brainstorm, and get quick answers."
      icon={<MessageSquare className="h-5 w-5" />}
    >
      <div className="flex h-[calc(100vh-14rem)] min-h-[32rem] flex-col rounded-xl border border-border/70 bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <BrandLogo size={22} />
            <span className="text-sm font-medium">Lumen Assistant</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSessionId(crypto.randomUUID())}
            disabled={isLoading}
          >
            <Plus className="mr-1 h-3.5 w-3.5" /> New chat
          </Button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="mx-auto flex max-w-xl flex-col items-center gap-5 py-8 text-center">
              <BrandLogo size={56} />
              <div>
                <h3 className="text-lg font-semibold">How can I help today?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ask anything, or try a starter prompt below.
                </p>
              </div>
              <div className="grid w-full gap-2 sm:grid-cols-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => void submit(s)}
                    className="rounded-lg border border-border/70 bg-background/60 p-3 text-left text-sm text-foreground/90 transition hover:border-primary/40 hover:bg-muted/60"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto flex max-w-3xl flex-col gap-5">
              {messages.map((m) => (
                <MessageRow key={m.id} message={m} />
              ))}
              {status === "submitted" && (
                <div className="flex items-center gap-2 px-1 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                </div>
              )}
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="border-t border-border/60 p-3">
          <div className="mx-auto flex max-w-3xl flex-col gap-2">
            <div className="relative">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Message Lumen…"
                rows={2}
                className="resize-none pr-12"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="absolute bottom-2 right-2 h-8 w-8"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <Disclaimer />
          </div>
        </form>
      </div>
    </PageShell>
  );
}

function MessageRow({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const text = getMessageText(message);
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className="shrink-0">
        {isUser ? (
          <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-muted-foreground">
            <User className="h-4 w-4" />
          </div>
        ) : (
          <BrandLogo size={32} />
        )}
      </div>
      <div className={`min-w-0 max-w-[85%] ${isUser ? "text-right" : ""}`}>
        {isUser ? (
          <div className="inline-block rounded-2xl bg-primary px-4 py-2.5 text-left text-sm leading-relaxed text-primary-foreground shadow-sm">
            {text}
          </div>
        ) : (
          <div className="rounded-2xl bg-muted/40 px-4 py-3 text-left text-sm">
            {text ? <Markdown>{text}</Markdown> : <span className="text-muted-foreground">…</span>}
          </div>
        )}
      </div>
    </div>
  );
}
