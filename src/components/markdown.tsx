import ReactMarkdown from "react-markdown";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-app">
      <ReactMarkdown
        components={{
          h1: (p) => <h1 className="mb-3 mt-4 text-xl font-semibold tracking-tight" {...p} />,
          h2: (p) => <h2 className="mb-2 mt-5 text-lg font-semibold tracking-tight text-foreground" {...p} />,
          h3: (p) => <h3 className="mb-1 mt-3 text-base font-semibold" {...p} />,
          p: (p) => <p className="mb-3 leading-relaxed text-foreground/90" {...p} />,
          ul: (p) => <ul className="mb-3 list-disc space-y-1 pl-5 text-foreground/90" {...p} />,
          ol: (p) => <ol className="mb-3 list-decimal space-y-1 pl-5 text-foreground/90" {...p} />,
          li: (p) => <li className="leading-relaxed" {...p} />,
          strong: (p) => <strong className="font-semibold text-foreground" {...p} />,
          code: (p) => (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]" {...p} />
          ),
          pre: (p) => (
            <pre className="mb-3 overflow-x-auto rounded-lg bg-muted p-3 font-mono text-sm" {...p} />
          ),
          table: (p) => (
            <div className="mb-3 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm" {...p} />
            </div>
          ),
          th: (p) => (
            <th className="border-b border-border bg-muted/50 px-3 py-2 text-left font-medium" {...p} />
          ),
          td: (p) => <td className="border-b border-border/50 px-3 py-2 align-top" {...p} />,
          a: (p) => <a className="text-primary underline underline-offset-2" {...p} />,
          blockquote: (p) => (
            <blockquote className="mb-3 border-l-2 border-primary/40 pl-3 italic text-foreground/80" {...p} />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
