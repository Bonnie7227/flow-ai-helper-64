# Lumen — AI Workplace Productivity Assistant

A modern, responsive web application that helps professionals automate daily work tasks using AI. Lumen features a clean SaaS dashboard with sidebar navigation, interactive components, and structured AI prompts designed for clear, professional output.

![Preview](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b8134835-5f39-4239-ad9a-b50a66ebe3ac/id-preview-ac677fcd--708fce71-e809-44a3-8968-472c07651258.lovable.app-1782377177848.png)

---

## Features

### Smart Email Generator
Draft polished business emails tuned to tone and audience.
- **Tone presets:** professional, friendly, persuasive, concise, apologetic, enthusiastic
- **Audience targeting:** client, manager, team, executive, vendor, candidate
- Structured output with subject line, body, and sign-off

### Meeting Notes Summarizer
Turn raw meeting transcripts into actionable intelligence.
- Concise summary (2-3 sentences)
- Key points and decisions
- Action items table with owner, task, and deadline
- Risks and open questions

### AI Task Planner
Prioritize and schedule work using the Eisenhower matrix.
- Priority matrix (P1/P2/P3) with effort estimates
- Suggested daily/weekly schedule with time-blocking
- Focus recommendations

### AI Research Assistant
Generate structured research briefs on any topic.
- Executive summary
- Key insights with concrete facts
- Opportunities & risks
- Suggested next steps
- Further reading queries

### AI Chatbot Interface
Conversational assistant for general workplace queries and iterative drafting.
- Streaming responses
- Markdown formatting
- Context-aware replies

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) (React 19 + Vite 8) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (Radix UI primitives) |
| AI Gateway | Lovable AI Gateway (`ai-sdk/openai-compatible`) |
| Default Model | `google/gemini-3-flash-preview` |
| State & Data | TanStack Query |
| Validation | Zod |
| Icons | Lucide React |

---

## Project Structure

```
src/
├── routes/              # File-based TanStack routes
│   ├── __root.tsx       # Root layout (sidebar + header)
│   ├── index.tsx        # Dashboard landing page
│   ├── email.tsx        # Smart Email Generator
│   ├── notes.tsx        # Meeting Notes Summarizer
│   ├── tasks.tsx        # AI Task Planner
│   ├── research.tsx     # AI Research Assistant
│   ├── chat.tsx         # AI Chatbot Interface
│   └── api/chat.ts      # Streaming chat endpoint
├── components/          # Reusable UI components
│   ├── app-sidebar.tsx  # Navigation sidebar
│   ├── page-shell.tsx   # Consistent page layout wrapper
│   ├── markdown.tsx     # Markdown renderer for AI output
│   ├── states.tsx       # Loading / empty / error states
│   └── disclaimer.tsx   # AI review disclaimer
├── lib/
│   ├── ai-gateway.server.ts   # AI provider configuration
│   └── ai-tasks.functions.ts  # Server functions for each tool
├── styles.css           # Tailwind theme tokens + custom styles
└── router.tsx           # TanStack Router bootstrap
```

---

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (or Node.js 20+)

### Install dependencies

```bash
bun install
```

### Set up environment variables

Create a `.env` file in the project root:

```bash
LOVABLE_API_KEY=your_lovable_api_key_here
```

> Get your API key from the [Lovable AI Gateway](https://docs.lovable.dev/features/ai-gateway).

### Run the development server

```bash
bun dev
```

The app will be available at `http://localhost:8080`.

### Build for production

```bash
bun run build
```

---

## Architecture Notes

- **Server functions** (`createServerFn`) handle all AI generation calls. Each tool has a dedicated, typed server function with Zod input validation and a structured system prompt.
- **Streaming chat** uses a dedicated API route (`/api/chat`) with `streamText` from the Vercel AI SDK for real-time message rendering.
- **Chat history** is persisted in the browser via `localStorage`.
- **Responsive design** adapts from desktop sidebar layout to mobile-friendly stacked views.

---

## Disclaimer

> **AI-generated content may require human review.** Lumen is designed to accelerate drafting and analysis, not to replace human judgment. Please verify facts, tone, and context before sending or acting on AI output.

---

## License

MIT
