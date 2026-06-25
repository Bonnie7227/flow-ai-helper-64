const pptxgen = require("pptxgenjs");
const fs = require("fs");

const logoBase64 = fs.readFileSync("/tmp/logo_base64.txt", "utf8");
const logoData = "image/png;base64," + logoBase64;

// Color palette (no # prefix)
const C_PRIMARY = "4F46E5";   // Indigo
const C_ACCENT = "14B8A6";   // Teal
const C_DARK = "0F172A";      // Deep slate (title bg)
const C_SLATE = "1E293B";     // Dark slate (text)
const C_MUTED = "64748B";     // Muted text
const C_LIGHT = "F8FAFC";     // Light bg
const C_WHITE = "FFFFFF";
const C_CARD = "F1F5F9";      // Card bg
const C_BORDER = "E2E8F0";    // Border

function makeShadow() {
  return { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.12 };
}

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Lumen AI";
pres.title = "Lumen — AI Workplace Productivity Assistant";
pres.subject = "Product Overview";

// Define slide master for consistent layouts
pres.defineSlideMaster({
  title: "MASTER_CONTENT",
  background: { color: C_WHITE },
  objects: [
    { rect: { x: 0, y: 0, w: 10, h: 0.12, fill: { color: C_PRIMARY } } },
    { line: { x: 0.5, y: 5.35, w: 9, h: 0, line: { color: C_BORDER, width: 0.5 } } },
    { text: { text: "Lumen — AI Workplace Productivity Assistant", options: { x: 0.5, y: 5.45, w: 5, h: 0.3, fontSize: 9, color: C_MUTED, fontFace: "Calibri" } } },
    { image: { data: logoData, x: 9.2, y: 5.45, w: 0.3, h: 0.3 } }
  ]
});

pres.defineSlideMaster({
  title: "MASTER_DARK",
  background: { color: C_DARK },
  objects: [
    { image: { data: logoData, x: 0.5, y: 0.4, w: 0.45, h: 0.45 } }
  ]
});

// Helper: fresh card shape options
function cardShape(x, y, w, h, fill) {
  return {
    shape: pres.shapes.RECTANGLE,
    x, y, w, h,
    fill: { color: fill || C_CARD },
    line: { color: C_BORDER, width: 0.5 },
    shadow: makeShadow()
  };
}

// ===== SLIDE 1: Title =====
let s1 = pres.addSlide({ masterName: "MASTER_DARK" });
s1.addText("Lumen", {
  x: 0.5, y: 1.6, w: 9, h: 1.2,
  fontSize: 72, bold: true, color: C_WHITE, fontFace: "Calibri",
  valign: "middle"
});
s1.addText("AI Workplace Productivity Assistant", {
  x: 0.5, y: 2.8, w: 9, h: 0.6,
  fontSize: 28, color: C_ACCENT, fontFace: "Calibri",
  valign: "middle"
});
s1.addText("Draft emails. Summarize meetings. Plan your week. Research faster. Chat naturally.", {
  x: 0.5, y: 3.5, w: 8, h: 0.6,
  fontSize: 16, color: C_MUTED, fontFace: "Calibri",
  valign: "middle"
});
s1.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.3, w: 2.2, h: 0.45,
  fill: { color: C_PRIMARY },
  line: { color: C_PRIMARY, width: 0 }
});
s1.addText("Powered by AI", {
  x: 0.5, y: 4.3, w: 2.2, h: 0.45,
  fontSize: 13, bold: true, color: C_WHITE, align: "center", valign: "middle", fontFace: "Calibri", margin: 0
});

// ===== SLIDE 2: The Problem =====
let s2 = pres.addSlide({ masterName: "MASTER_CONTENT" });
s2.addText("The Problem", { x: 0.5, y: 0.5, w: 9, h: 0.7, fontSize: 40, bold: true, color: C_SLATE, fontFace: "Calibri", margin: 0 });

s2.addShape(pres.shapes.RECTANGLE, cardShape(0.5, 1.5, 4.2, 1.2, C_CARD));
s2.addText("Email Overload", { x: 0.7, y: 1.6, w: 3.8, h: 0.4, fontSize: 20, bold: true, color: C_PRIMARY, fontFace: "Calibri", margin: 0 });
s2.addText("Professionals spend hours crafting the right tone and structure for every message.", { x: 0.7, y: 2.05, w: 3.8, h: 0.5, fontSize: 13, color: C_SLATE, fontFace: "Calibri", margin: 0 });

s2.addShape(pres.shapes.RECTANGLE, cardShape(5.3, 1.5, 4.2, 1.2, C_CARD));
s2.addText("Meeting Chaos", { x: 5.5, y: 1.6, w: 3.8, h: 0.4, fontSize: 20, bold: true, color: C_PRIMARY, fontFace: "Calibri", margin: 0 });
s2.addText("Valuable decisions and action items get buried in pages of unstructured notes.", { x: 5.5, y: 2.05, w: 3.8, h: 0.5, fontSize: 13, color: C_SLATE, fontFace: "Calibri", margin: 0 });

s2.addShape(pres.shapes.RECTANGLE, cardShape(0.5, 2.95, 4.2, 1.2, C_CARD));
s2.addText("Task Paralysis", { x: 0.7, y: 3.05, w: 3.8, h: 0.4, fontSize: 20, bold: true, color: C_PRIMARY, fontFace: "Calibri", margin: 0 });
s2.addText("Without a clear prioritization system, important work gets delayed by urgency.", { x: 0.7, y: 3.5, w: 3.8, h: 0.5, fontSize: 13, color: C_SLATE, fontFace: "Calibri", margin: 0 });

s2.addShape(pres.shapes.RECTANGLE, cardShape(5.3, 2.95, 4.2, 1.2, C_CARD));
s2.addText("Research Friction", { x: 5.5, y: 3.05, w: 3.8, h: 0.4, fontSize: 20, bold: true, color: C_PRIMARY, fontFace: "Calibri", margin: 0 });
s2.addText("Synthesizing scattered information into actionable briefs is time-consuming.", { x: 5.5, y: 3.5, w: 3.8, h: 0.5, fontSize: 13, color: C_SLATE, fontFace: "Calibri", margin: 0 });

s2.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.4, w: 9, h: 0.7,
  fill: { color: C_PRIMARY }, line: { color: C_PRIMARY, width: 0 }
});
s2.addText("Lumen brings structure, speed, and clarity to every daily workflow.", {
  x: 0.5, y: 4.4, w: 9, h: 0.7,
  fontSize: 16, bold: true, color: C_WHITE, align: "center", valign: "middle", fontFace: "Calibri", margin: 0
});

// ===== SLIDE 3: Feature Overview =====
let s3 = pres.addSlide({ masterName: "MASTER_CONTENT" });
s3.addText("Five Tools. One Surface.", { x: 0.5, y: 0.5, w: 9, h: 0.7, fontSize: 40, bold: true, color: C_SLATE, fontFace: "Calibri", margin: 0 });
s3.addText("A unified dashboard where structured AI prompts deliver professional results.", { x: 0.5, y: 1.15, w: 9, h: 0.4, fontSize: 14, color: C_MUTED, fontFace: "Calibri", margin: 0 });

const features = [
  { title: "Smart Email Generator", desc: "Tone + audience-based drafting with 6 tones and 6 audience types.", iconColor: C_PRIMARY },
  { title: "Meeting Notes Summarizer", desc: "Extract key points, decisions, action items, and deadlines from raw notes.", iconColor: C_ACCENT },
  { title: "AI Task Planner", desc: "Eisenhower matrix prioritization with time-blocked daily/weekly plans.", iconColor: C_PRIMARY },
  { title: "AI Research Assistant", desc: "Structured briefs with insights, risks, next steps, and reading queries.", iconColor: C_ACCENT },
  { title: "AI Chatbot", desc: "Streaming conversational assistant for drafting, brainstorming, and Q&A.", iconColor: C_PRIMARY }
];

features.forEach((f, i) => {
  let col = i % 3;
  let row = Math.floor(i / 3);
  let x = 0.5 + col * 3.1;
  let y = 1.7 + row * 1.85;
  s3.addShape(pres.shapes.RECTANGLE, cardShape(x, y, 2.9, 1.6, C_CARD));
  s3.addShape(pres.shapes.OVAL, { x: x + 0.15, y: y + 0.15, w: 0.35, h: 0.35, fill: { color: f.iconColor } });
  s3.addText(f.title, { x: x + 0.6, y: y + 0.15, w: 2.1, h: 0.35, fontSize: 14, bold: true, color: C_SLATE, fontFace: "Calibri", valign: "middle", margin: 0 });
  s3.addText(f.desc, { x: x + 0.15, y: y + 0.6, w: 2.6, h: 0.85, fontSize: 11, color: C_MUTED, fontFace: "Calibri", margin: 0 });
});

// ===== SLIDE 4: Smart Email Generator =====
let s4 = pres.addSlide({ masterName: "MASTER_CONTENT" });
s4.addText("Smart Email Generator", { x: 0.5, y: 0.5, w: 9, h: 0.7, fontSize: 40, bold: true, color: C_SLATE, fontFace: "Calibri", margin: 0 });
s4.addText("Draft polished business emails tuned to tone and audience.", { x: 0.5, y: 1.15, w: 9, h: 0.4, fontSize: 14, color: C_MUTED, fontFace: "Calibri", margin: 0 });

s4.addShape(pres.shapes.RECTANGLE, cardShape(0.5, 1.7, 4.5, 2.8, C_CARD));
s4.addText("Tone Presets", { x: 0.7, y: 1.85, w: 4.1, h: 0.35, fontSize: 18, bold: true, color: C_PRIMARY, fontFace: "Calibri", margin: 0 });
s4.addText([
  { text: "Professional", options: { bullet: true, breakLine: true } },
  { text: "Friendly", options: { bullet: true, breakLine: true } },
  { text: "Persuasive", options: { bullet: true, breakLine: true } },
  { text: "Concise", options: { bullet: true, breakLine: true } },
  { text: "Apologetic", options: { bullet: true, breakLine: true } },
  { text: "Enthusiastic", options: { bullet: true } }
], { x: 0.7, y: 2.3, w: 4.1, h: 2.0, fontSize: 13, color: C_SLATE, fontFace: "Calibri", paraSpaceAfter: 6 });

s4.addShape(pres.shapes.RECTANGLE, cardShape(5.1, 1.7, 4.4, 2.8, C_CARD));
s4.addText("Audience Targeting", { x: 5.3, y: 1.85, w: 4.0, h: 0.35, fontSize: 18, bold: true, color: C_ACCENT, fontFace: "Calibri", margin: 0 });
s4.addText([
  { text: "Client", options: { bullet: true, breakLine: true } },
  { text: "Manager", options: { bullet: true, breakLine: true } },
  { text: "Team", options: { bullet: true, breakLine: true } },
  { text: "Executive", options: { bullet: true, breakLine: true } },
  { text: "Vendor", options: { bullet: true, breakLine: true } },
  { text: "Candidate", options: { bullet: true } }
], { x: 5.3, y: 2.3, w: 4.0, h: 2.0, fontSize: 13, color: C_SLATE, fontFace: "Calibri", paraSpaceAfter: 6 });

s4.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.7, w: 9, h: 0.5,
  fill: { color: C_LIGHT }, line: { color: C_BORDER, width: 0.5 }
});
s4.addText("Structured output: Subject line, body text, and professional sign-off.", {
  x: 0.5, y: 4.7, w: 9, h: 0.5,
  fontSize: 13, color: C_MUTED, align: "center", valign: "middle", fontFace: "Calibri", margin: 0
});

// ===== SLIDE 5: Meeting Notes Summarizer =====
let s5 = pres.addSlide({ masterName: "MASTER_CONTENT" });
s5.addText("Meeting Notes Summarizer", { x: 0.5, y: 0.5, w: 9, h: 0.7, fontSize: 40, bold: true, color: C_SLATE, fontFace: "Calibri", margin: 0 });
s5.addText("Turn raw transcripts into actionable intelligence.", { x: 0.5, y: 1.15, w: 9, h: 0.4, fontSize: 14, color: C_MUTED, fontFace: "Calibri", margin: 0 });

const noteItems = [
  { title: "Concise Summary", desc: "2-3 sentence recap of the entire meeting." },
  { title: "Key Points & Decisions", desc: "Critical outcomes and strategic choices made." },
  { title: "Action Items Table", desc: "Owner, task, and deadline in a clean structure." },
  { title: "Risks & Open Questions", desc: "Flags and unresolved items for follow-up." }
];

noteItems.forEach((item, i) => {
  let y = 1.7 + i * 0.85;
  s5.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: y, w: 0.08, h: 0.65,
    fill: { color: i % 2 === 0 ? C_PRIMARY : C_ACCENT },
    line: { color: "000000", width: 0 }
  });
  s5.addShape(pres.shapes.RECTANGLE, {
    x: 0.58, y: y, w: 8.92, h: 0.65,
    fill: { color: C_CARD },
    line: { color: C_BORDER, width: 0.5 }
  });
  s5.addText(item.title, { x: 0.78, y: y, w: 3.5, h: 0.65, fontSize: 14, bold: true, color: C_SLATE, fontFace: "Calibri", valign: "middle", margin: 0 });
  s5.addText(item.desc, { x: 4.4, y: y, w: 4.8, h: 0.65, fontSize: 12, color: C_MUTED, fontFace: "Calibri", valign: "middle", margin: 0 });
});

// ===== SLIDE 6: AI Task Planner =====
let s6 = pres.addSlide({ masterName: "MASTER_CONTENT" });
s6.addText("AI Task Planner", { x: 0.5, y: 0.5, w: 9, h: 0.7, fontSize: 40, bold: true, color: C_SLATE, fontFace: "Calibri", margin: 0 });
s6.addText("Prioritize and schedule with the Eisenhower matrix.", { x: 0.5, y: 1.15, w: 9, h: 0.4, fontSize: 14, color: C_MUTED, fontFace: "Calibri", margin: 0 });

s6.addShape(pres.shapes.RECTANGLE, cardShape(0.5, 1.7, 4.5, 2.6, C_CARD));
s6.addText("Planning Horizons", { x: 0.7, y: 1.85, w: 4.1, h: 0.35, fontSize: 18, bold: true, color: C_PRIMARY, fontFace: "Calibri", margin: 0 });
s6.addText([
  { text: "Today — focused time-blocking for immediate priorities", options: { bullet: true, breakLine: true } },
  { text: "This Week — balanced workload with buffer time", options: { bullet: true, breakLine: true } },
  { text: "This Month — strategic project milestones", options: { bullet: true } }
], { x: 0.7, y: 2.35, w: 4.1, h: 1.8, fontSize: 13, color: C_SLATE, fontFace: "Calibri", paraSpaceAfter: 8 });

s6.addShape(pres.shapes.RECTANGLE, cardShape(5.1, 1.7, 4.4, 2.6, C_CARD));
s6.addText("Priority Matrix", { x: 5.3, y: 1.85, w: 4.0, h: 0.35, fontSize: 18, bold: true, color: C_ACCENT, fontFace: "Calibri", margin: 0 });
s6.addText([
  { text: "P1 — Do first (urgent & important)", options: { bullet: true, breakLine: true } },
  { text: "P2 — Schedule (important, not urgent)", options: { bullet: true, breakLine: true } },
  { text: "P3 — Delegate (urgent, not important)", options: { bullet: true, breakLine: true } },
  { text: "Effort estimates for realistic planning", options: { bullet: true } }
], { x: 5.3, y: 2.35, w: 4.0, h: 1.8, fontSize: 13, color: C_SLATE, fontFace: "Calibri", paraSpaceAfter: 8 });

s6.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.5, w: 9, h: 0.7,
  fill: { color: C_PRIMARY }, line: { color: C_PRIMARY, width: 0 }
});
s6.addText("Dump your task list. Get a prioritized, time-blocked plan.", {
  x: 0.5, y: 4.5, w: 9, h: 0.7,
  fontSize: 15, bold: true, color: C_WHITE, align: "center", valign: "middle", fontFace: "Calibri", margin: 0
});

// ===== SLIDE 7: AI Research Assistant =====
let s7 = pres.addSlide({ masterName: "MASTER_CONTENT" });
s7.addText("AI Research Assistant", { x: 0.5, y: 0.5, w: 9, h: 0.7, fontSize: 40, bold: true, color: C_SLATE, fontFace: "Calibri", margin: 0 });
s7.addText("Generate structured research briefs you can act on.", { x: 0.5, y: 1.15, w: 9, h: 0.4, fontSize: 14, color: C_MUTED, fontFace: "Calibri", margin: 0 });

const researchItems = [
  { title: "Executive Summary", desc: "Top-line takeaway in a few sentences." },
  { title: "Key Insights", desc: "Concrete facts and data-driven observations." },
  { title: "Opportunities & Risks", desc: "Strategic openings and potential pitfalls." },
  { title: "Next Steps", desc: "Actionable recommendations with clear direction." },
  { title: "Further Reading", desc: "Suggested queries to deepen understanding." }
];

researchItems.forEach((item, i) => {
  let y = 1.7 + i * 0.68;
  s7.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: y, w: 0.08, h: 0.55,
    fill: { color: i % 2 === 0 ? C_PRIMARY : C_ACCENT },
    line: { color: "000000", width: 0 }
  });
  s7.addShape(pres.shapes.RECTANGLE, {
    x: 0.58, y: y, w: 8.92, h: 0.55,
    fill: { color: C_CARD },
    line: { color: C_BORDER, width: 0.5 }
  });
  s7.addText(item.title, { x: 0.78, y: y, w: 3.0, h: 0.55, fontSize: 13, bold: true, color: C_SLATE, fontFace: "Calibri", valign: "middle", margin: 0 });
  s7.addText(item.desc, { x: 3.9, y: y, w: 5.3, h: 0.55, fontSize: 12, color: C_MUTED, fontFace: "Calibri", valign: "middle", margin: 0 });
});

s7.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 5.05, w: 9, h: 0.25,
  fill: { color: C_LIGHT }, line: { color: C_BORDER, width: 0 }
});
s7.addText("Three depth levels: Brief (~250 words), Standard (~500 words), Deep (~900 words)", {
  x: 0.5, y: 5.05, w: 9, h: 0.25,
  fontSize: 11, color: C_MUTED, align: "center", valign: "middle", fontFace: "Calibri", margin: 0
});

// ===== SLIDE 8: AI Chatbot =====
let s8 = pres.addSlide({ masterName: "MASTER_CONTENT" });
s8.addText("AI Chatbot", { x: 0.5, y: 0.5, w: 9, h: 0.7, fontSize: 40, bold: true, color: C_SLATE, fontFace: "Calibri", margin: 0 });
s8.addText("Conversational assistant for drafting, brainstorming, and workplace Q&A.", { x: 0.5, y: 1.15, w: 9, h: 0.4, fontSize: 14, color: C_MUTED, fontFace: "Calibri", margin: 0 });

s8.addShape(pres.shapes.RECTANGLE, cardShape(0.5, 1.7, 4.5, 2.6, C_CARD));
s8.addText("Key Capabilities", { x: 0.7, y: 1.85, w: 4.1, h: 0.35, fontSize: 18, bold: true, color: C_PRIMARY, fontFace: "Calibri", margin: 0 });
s8.addText([
  { text: "Real-time streaming responses", options: { bullet: true, breakLine: true } },
  { text: "Markdown formatting in replies", options: { bullet: true, breakLine: true } },
  { text: "Context-aware follow-ups", options: { bullet: true, breakLine: true } },
  { text: "Session-based chat history", options: { bullet: true, breakLine: true } },
  { text: "Starter prompts for quick access", options: { bullet: true } }
], { x: 0.7, y: 2.35, w: 4.1, h: 1.8, fontSize: 13, color: C_SLATE, fontFace: "Calibri", paraSpaceAfter: 8 });

s8.addShape(pres.shapes.RECTANGLE, cardShape(5.1, 1.7, 4.4, 2.6, C_CARD));
s8.addText("Use Cases", { x: 5.3, y: 1.85, w: 4.0, h: 0.35, fontSize: 18, bold: true, color: C_ACCENT, fontFace: "Calibri", margin: 0 });
s8.addText([
  { text: "Draft follow-up emails to clients", options: { bullet: true, breakLine: true } },
  { text: "Prep 1:1 talking points with managers", options: { bullet: true, breakLine: true } },
  { text: "Brainstorm initiative names", options: { bullet: true, breakLine: true } },
  { text: "Summarize policy debates", options: { bullet: true, breakLine: true } },
  { text: "Iterate on any AI-generated draft", options: { bullet: true } }
], { x: 5.3, y: 2.35, w: 4.0, h: 1.8, fontSize: 13, color: C_SLATE, fontFace: "Calibri", paraSpaceAfter: 8 });

// ===== SLIDE 9: Tech Stack =====
let s9 = pres.addSlide({ masterName: "MASTER_CONTENT" });
s9.addText("Tech Stack", { x: 0.5, y: 0.5, w: 9, h: 0.7, fontSize: 40, bold: true, color: C_SLATE, fontFace: "Calibri", margin: 0 });
s9.addText("Modern full-stack architecture built for performance and scale.", { x: 0.5, y: 1.15, w: 9, h: 0.4, fontSize: 14, color: C_MUTED, fontFace: "Calibri", margin: 0 });

const stack = [
  ["Framework", "TanStack Start (React 19 + Vite 8)"],
  ["Styling", "Tailwind CSS v4"],
  ["UI Components", "shadcn/ui (Radix UI primitives)"],
  ["AI Gateway", "Lovable AI Gateway (ai-sdk/openai-compatible)"],
  ["Default Model", "google/gemini-3-flash-preview"],
  ["State Management", "TanStack Query"],
  ["Validation", "Zod"],
  ["Icons", "Lucide React"]
];

s9.addTable(stack, {
  x: 0.5, y: 1.7, w: 9, h: 3.2,
  colW: [3, 6],
  border: { pt: 0.5, color: C_BORDER },
  fill: { color: C_CARD },
  fontFace: "Calibri",
  fontSize: 13,
  color: C_SLATE,
  valign: "middle"
});
s9.addText("Server functions handle all AI calls with Zod validation. Streaming chat uses the Vercel AI SDK.", {
  x: 0.5, y: 5.05, w: 9, h: 0.3,
  fontSize: 11, color: C_MUTED, align: "center", fontFace: "Calibri", margin: 0
});

// ===== SLIDE 10: Architecture =====
let s10 = pres.addSlide({ masterName: "MASTER_CONTENT" });
s10.addText("Architecture Highlights", { x: 0.5, y: 0.5, w: 9, h: 0.7, fontSize: 40, bold: true, color: C_SLATE, fontFace: "Calibri", margin: 0 });

const archItems = [
  "Server functions (createServerFn) with typed RPC for every AI tool",
  "Dedicated structured prompts per feature — email, notes, tasks, research",
  "Streaming chat endpoint via /api/chat with real-time message rendering",
  "Chat history persisted in browser localStorage",
  "Responsive sidebar layout adapting from desktop to mobile",
  "Consistent page shell with loading, empty, and error states",
  "AI disclaimer on every output surface"
];

archItems.forEach((text, i) => {
  let y = 1.5 + i * 0.48;
  s10.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: y, w: 9, h: 0.42,
    fill: { color: C_CARD },
    line: { color: C_BORDER, width: 0.5 }
  });
  s10.addText(text, {
    x: 0.7, y: y, w: 8.6, h: 0.42,
    fontSize: 13, color: C_SLATE, fontFace: "Calibri", valign: "middle", margin: 0
  });
});

// ===== SLIDE 11: Closing =====
let s11 = pres.addSlide({ masterName: "MASTER_DARK" });
s11.addText("Lumen", {
  x: 0.5, y: 1.8, w: 9, h: 1.0,
  fontSize: 60, bold: true, color: C_WHITE, fontFace: "Calibri", valign: "middle"
});
s11.addText("Your AI workplace, in one calm surface.", {
  x: 0.5, y: 2.9, w: 9, h: 0.5,
  fontSize: 22, color: C_ACCENT, fontFace: "Calibri", valign: "middle"
});
s11.addText("Draft emails  Summarize meetings  Plan your week  Research faster  Chat naturally", {
  x: 0.5, y: 3.6, w: 9, h: 0.4,
  fontSize: 13, color: C_MUTED, fontFace: "Calibri", valign: "middle"
});
s11.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.3, w: 2.5, h: 0.5,
  fill: { color: C_PRIMARY }, line: { color: C_PRIMARY, width: 0 }
});
s11.addText("Learn More", {
  x: 0.5, y: 4.3, w: 2.5, h: 0.5,
  fontSize: 14, bold: true, color: C_WHITE, align: "center", valign: "middle", fontFace: "Calibri", margin: 0
});

// ===== SAVE =====
pres.writeFile({ fileName: "/mnt/documents/Lumen_AI_Workplace_Assistant.pptx" });
console.log("Presentation saved to /mnt/documents/Lumen_AI_Workplace_Assistant.pptx");
