import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { getGateway, DEFAULT_MODEL } from "./ai-gateway.server";

async function run(system: string, prompt: string) {
  const gateway = getGateway();
  const { text } = await generateText({
    model: gateway(DEFAULT_MODEL),
    system,
    prompt,
  });
  return { text };
}

// ---- Email Generator ----
const EmailInput = z.object({
  recipient: z.string().min(1),
  purpose: z.string().min(1),
  tone: z.enum(["professional", "friendly", "persuasive", "concise", "apologetic", "enthusiastic"]),
  audience: z.enum(["client", "manager", "team", "executive", "vendor", "candidate"]),
  context: z.string().optional().default(""),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => EmailInput.parse(d))
  .handler(async ({ data }) => {
    const system = `You are an executive communications writer. Produce polished business emails.
Constraints:
- Output ONLY the email (Subject line, blank line, body, sign-off).
- Match the requested tone precisely.
- Tailor wording to the audience role.
- Keep paragraphs short. No filler. No meta commentary.`;
    const prompt = `Write an email with the following parameters.
Recipient: ${data.recipient}
Audience: ${data.audience}
Tone: ${data.tone}
Purpose: ${data.purpose}
Additional context: ${data.context || "(none)"}

Format:
Subject: <subject line>

<body>

<sign-off>`;
    return run(system, prompt);
  });

// ---- Meeting Notes Summarizer ----
const NotesInput = z.object({
  transcript: z.string().min(20),
});

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => NotesInput.parse(d))
  .handler(async ({ data }) => {
    const system = `You are a meeting analyst. Summarize transcripts into clear, structured Markdown.`;
    const prompt = `Analyze the following meeting notes / transcript and produce:

## Summary
A 2-3 sentence overview.

## Key Points
- Bulleted list of decisions and discussion topics.

## Action Items
A markdown table with columns: Owner | Task | Deadline. Use "Unassigned" or "TBD" when missing.

## Risks & Open Questions
- Bullet list. Omit section if none.

Transcript:
"""
${data.transcript}
"""`;
    return run(system, prompt);
  });

// ---- Task Planner ----
const TasksInput = z.object({
  tasks: z.string().min(5),
  horizon: z.enum(["today", "this-week", "this-month"]).default("this-week"),
});

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => TasksInput.parse(d))
  .handler(async ({ data }) => {
    const system = `You are a productivity coach using Eisenhower (urgency/importance) + time-blocking.`;
    const prompt = `Given this task list, create a prioritized plan for the horizon: ${data.horizon}.

Tasks:
"""
${data.tasks}
"""

Output in Markdown:

## Priority Matrix
Markdown table: Task | Priority (P1/P2/P3) | Effort (S/M/L) | Rationale

## Suggested Schedule
Ordered list grouped by day or time block. Be realistic about effort.

## Focus Recommendation
One short paragraph: what to tackle first and why.`;
    return run(system, prompt);
  });

// ---- Research Assistant ----
const ResearchInput = z.object({
  topic: z.string().min(3),
  depth: z.enum(["brief", "standard", "deep"]).default("standard"),
});

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ResearchInput.parse(d))
  .handler(async ({ data }) => {
    const lengthHint = {
      brief: "Keep total under 250 words.",
      standard: "Around 500 words.",
      deep: "Up to 900 words with nuanced analysis.",
    }[data.depth];
    const system = `You are a senior research analyst. Produce structured, factual briefs. Be explicit about uncertainty. Do not fabricate citations.`;
    const prompt = `Research topic: ${data.topic}
${lengthHint}

Output in Markdown:

## Executive Summary
2-3 sentence TL;DR.

## Key Insights
- 4-6 bullet points with concrete facts or frameworks.

## Opportunities & Risks
Two short subsections.

## Suggested Next Steps
Numbered list (3-5 items).

## Further Reading
Bulleted list of topics or search queries to explore (no fabricated URLs).`;
    return run(system, prompt);
  });
