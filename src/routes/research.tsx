import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { researchTopic } from "@/lib/ai-tasks.functions";
import { PageShell } from "@/components/page-shell";
import { Disclaimer } from "@/components/disclaimer";
import { Markdown } from "@/components/markdown";
import { LoadingState, EmptyState } from "@/components/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Lumen" },
      { name: "description", content: "Structured briefs with insights, risks, and next steps." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const fn = useServerFn(researchTopic);
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState<"brief" | "standard" | "deep">("standard");

  const mutation = useMutation({
    mutationFn: (vars: { topic: string; depth: "brief" | "standard" | "deep" }) =>
      fn({ data: vars }),
    onError: (e: Error) => toast.error(e.message || "Research failed"),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (topic.trim().length < 3) {
      toast.error("Give a topic to research");
      return;
    }
    mutation.mutate({ topic, depth });
  }

  return (
    <PageShell
      title="AI Research Assistant"
      description="Ask a question or topic. Get a clean brief you can act on."
      icon={<Search className="h-5 w-5" />}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border/70 bg-card p-5 shadow-sm">
          <div className="space-y-1.5">
            <Label htmlFor="topic">Topic or question</Label>
            <Input
              id="topic"
              placeholder="e.g. Pricing strategies for B2B SaaS in 2026"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Depth</Label>
            <Select value={depth} onValueChange={(v) => setDepth(v as typeof depth)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="brief">Brief (~250 words)</SelectItem>
                <SelectItem value="standard">Standard (~500 words)</SelectItem>
                <SelectItem value="deep">Deep (~900 words)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Researching…</>) : "Generate Brief"}
          </Button>
          <Disclaimer />
        </form>

        <div className="flex min-h-[24rem] flex-col rounded-xl border border-border/70 bg-card p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Brief</h2>
          {mutation.isPending ? (
            <LoadingState label="Synthesizing insights…" />
          ) : mutation.data?.text ? (
            <Markdown>{mutation.data.text}</Markdown>
          ) : (
            <EmptyState text="Your research brief will appear here." />
          )}
        </div>
      </div>
    </PageShell>
  );
}
