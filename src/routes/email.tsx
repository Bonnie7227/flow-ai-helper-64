import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Mail, Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

import { generateEmail } from "@/lib/ai-tasks.functions";
import { PageShell } from "@/components/page-shell";
import { Disclaimer } from "@/components/disclaimer";
import { LoadingState, EmptyState } from "@/components/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Lumen" },
      { name: "description", content: "Draft polished emails tuned to tone and audience." },
    ],
  }),
  component: EmailPage,
});

type EmailVars = {
  recipient: string;
  purpose: string;
  context: string;
  tone: string;
  audience: string;
};

function EmailPage() {
  const gen = useServerFn(generateEmail);
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("professional");
  const [audience, setAudience] = useState("client");
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationFn: (vars: EmailVars) => gen({ data: vars }),
    onError: (e: Error) => toast.error(e.message || "Generation failed"),
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!recipient.trim() || !purpose.trim()) {
      toast.error("Recipient and purpose are required");
      return;
    }
    mutation.mutate({ recipient, purpose, context, tone, audience });
  }

  async function copy() {
    if (!mutation.data?.text) return;
    await navigator.clipboard.writeText(mutation.data.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <PageShell
      title="Smart Email Generator"
      description="Tell us who and why. We'll match the tone to your audience."
      icon={<Mail className="h-5 w-5" />}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border/70 bg-card p-5 shadow-sm">
          <div className="space-y-1.5">
            <Label htmlFor="recipient">Recipient</Label>
            <Input id="recipient" placeholder="e.g. Sarah, Head of Product" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="apologetic">Apologetic</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="candidate">Candidate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="purpose">Purpose</Label>
            <Input id="purpose" placeholder="e.g. Reschedule Thursday's review to next Tuesday" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="context">Additional context (optional)</Label>
            <Textarea id="context" rows={4} placeholder="Background, constraints, names, references…" value={context} onChange={(e) => setContext(e.target.value)} />
          </div>

          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Drafting…</>) : "Generate Email"}
          </Button>
          <Disclaimer />
        </form>

        <div className="flex min-h-[20rem] flex-col rounded-xl border border-border/70 bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Draft</h2>
            {mutation.data?.text && (
              <Button size="sm" variant="ghost" onClick={copy}>
                {copied ? <Check className="mr-1 h-3.5 w-3.5" /> : <Copy className="mr-1 h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            )}
          </div>
          {mutation.isPending ? (
            <LoadingState label="Composing your email…" />
          ) : mutation.data?.text ? (
            <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground/90">
              {mutation.data.text}
            </div>
          ) : (
            <EmptyState text="Your generated email will appear here." />
          )}
        </div>
      </div>
    </PageShell>
  );
}
