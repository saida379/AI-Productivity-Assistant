import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function AiDisclaimer({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-lg border border-border bg-muted/60 p-3 text-xs text-muted-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <span>
        {children ??
          "AI-generated guidance. It can be incomplete or wrong, and it is not a promise of a job, placement or bursary. Always check the official advert before you apply."}
      </span>
    </p>
  );
}
