import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Disclaimer } from "@/components/disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Lumen" },
      { name: "description", content: "Your AI workplace command center." },
    ],
  }),
  component: Dashboard,
});

const features = [
  {
    title: "Smart Email Generator",
    description: "Draft polished emails tuned to tone and audience.",
    href: "/email",
    icon: Mail,
    badge: "Tone + audience",
  },
  {
    title: "Meeting Notes Summarizer",
    description: "Turn raw notes into key points, actions, and deadlines.",
    href: "/notes",
    icon: FileText,
    badge: "Action items",
  },
  {
    title: "AI Task Planner",
    description: "Prioritize and schedule with the Eisenhower matrix.",
    href: "/tasks",
    icon: ListChecks,
    badge: "Prioritization",
  },
  {
    title: "AI Research Assistant",
    description: "Get briefs with insights, risks, and next steps.",
    href: "/research",
    icon: Search,
    badge: "Insights",
  },
  {
    title: "AI Chatbot",
    description: "Ask anything. Iterate on drafts in conversation.",
    href: "/chat",
    icon: MessageSquare,
    badge: "Conversational",
  },
] as const;

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <section className="mb-10 overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              Powered by AI
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Your AI workplace,
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                in one calm surface.
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              Draft emails, summarize meetings, plan your week, and research topics — all with
              structured prompts designed for clear, professional output.
            </p>
          </div>
          <div className="shrink-0">
            <BrandLogo size={72} />
          </div>
        </div>
      </section>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Workspace tools
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Link
            key={f.href}
            to={f.href}
            className="group relative flex flex-col rounded-xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
                <f.icon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {f.badge}
              </span>
            </div>
            <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
            <div className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Open <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
}
