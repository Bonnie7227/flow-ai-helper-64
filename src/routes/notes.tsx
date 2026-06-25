import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { summarizeNotes } from "@/lib/ai-tasks.functions";
import { PageShell } from "@/components/page-shell";
import { Disclaimer } from "@/components/disclaimer";
import { Markdown } from "@/components/markdown";
import { LoadingState, EmptyState } from "@/components/states";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const SAMPLE = `Alex: Q3 launch slipped two weeks because design review took longer than expected.
Priya: We need marketing assets by next Friday or we miss the press window.
Jordan: I'll own the asset list and share by EOD Wednesday.
Alex: Risk - engineering capacity, two devs out next week.
Priya: Decision: push launch to Oct 14. Comms team will draft a customer note by Oct 8.`;

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Lumen" },
      { name: "description", content: "Turn raw notes into key points, action items, and deadlines." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const fn = useServerFn(summarizeNotes);
  const [transcript, setTranscript] = useState("");

  const mutation = useMutation({
    mutationFn: (t: string) => fn({ data: { transcript: t } }),
    onError: (e: Error) => toast.error(e.message || "Summarization failed"),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (transcript.trim().length < 20) {
      toast.error("Paste at least a few lines of notes");
      return;
    }
    mutation.mutate(transcript);
  }

  return (
    <PageShell
      title="Meeting Notes Summarizer"
      description="Paste raw notes — get a summary, decisions, action items, and deadlines."
      icon={<FileText className="h-5 w-5" />}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border/70 bg-card p-5 shadow-sm">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="transcript">Notes / transcript</Label>
              <button
                type="button"
                className="text-xs text-primary hover:underline"
                onClick={() => setTranscript(SAMPLE)}
              >
                Load sample
              </button>
            </div>
            <Textarea
              id="transcript"
              rows={16}
              placeholder="Paste your raw meeting notes here…"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="font-mono text-sm"
            />
          </div>
          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing…</>) : "Summarize Notes"}
          </Button>
          <Disclaimer />
        </form>

        <div className="flex min-h-[24rem] flex-col rounded-xl border border-border/70 bg-card p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Summary</h2>
          {mutation.isPending ? (
            <LoadingState label="Extracting key points…" />
          ) : mutation.data?.text ? (
            <Markdown>{mutation.data.text}</Markdown>
          ) : (
            <EmptyState text="The structured summary will appear here." />
          )}
        </div>
      </div>
    </PageShell>
  );
}
