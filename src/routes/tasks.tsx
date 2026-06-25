import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ListChecks, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { planTasks } from "@/lib/ai-tasks.functions";
import { PageShell } from "@/components/page-shell";
import { Disclaimer } from "@/components/disclaimer";
import { Markdown } from "@/components/markdown";
import { LoadingState, EmptyState } from "@/components/states";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Lumen" },
      { name: "description", content: "Prioritize and schedule with the Eisenhower matrix." },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const fn = useServerFn(planTasks);
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState<"today" | "this-week" | "this-month">("this-week");

  const mutation = useMutation({
    mutationFn: (vars: { tasks: string; horizon: "today" | "this-week" | "this-month" }) =>
      fn({ data: vars }),
    onError: (e: Error) => toast.error(e.message || "Planning failed"),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (tasks.trim().length < 5) {
      toast.error("Add a few tasks first");
      return;
    }
    mutation.mutate({ tasks, horizon });
  }

  return (
    <PageShell
      title="AI Task Planner"
      description="Dump your task list. Get a prioritized, time-blocked plan."
      icon={<ListChecks className="h-5 w-5" />}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border/70 bg-card p-5 shadow-sm">
          <div className="space-y-1.5">
            <Label>Planning horizon</Label>
            <Select value={horizon} onValueChange={(v) => setHorizon(v as typeof horizon)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This week</SelectItem>
                <SelectItem value="this-month">This month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tasks">Tasks (one per line)</Label>
            <Textarea
              id="tasks"
              rows={14}
              placeholder={`Finalize Q4 budget\nReview design mocks\nReply to vendor proposal\nPrep for board update\n…`}
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              className="font-mono text-sm"
            />
          </div>

          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Prioritizing…</>) : "Plan Tasks"}
          </Button>
          <Disclaimer />
        </form>

        <div className="flex min-h-[24rem] flex-col rounded-xl border border-border/70 bg-card p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Plan</h2>
          {mutation.isPending ? (
            <LoadingState label="Building your plan…" />
          ) : mutation.data?.text ? (
            <Markdown>{mutation.data.text}</Markdown>
          ) : (
            <EmptyState text="Your prioritized plan will appear here." />
          )}
        </div>
      </div>
    </PageShell>
  );
}
