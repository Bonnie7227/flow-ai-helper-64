import { Loader2 } from "lucide-react";

export function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin text-primary" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-1 items-center justify-center py-12">
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
