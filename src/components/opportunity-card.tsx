import { Bookmark, BookmarkCheck, BadgeCheck, CalendarDays, MapPin, Sparkles, Wallet } from "lucide-react";
import type { Opportunity } from "@/data/opportunities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppStore } from "@/lib/app-store";

export function matchTone(score: number) {
  if (score >= 80) return { label: "Strong match", className: "bg-success/15 text-success border-success/30" };
  if (score >= 60) return { label: "Possible match", className: "bg-warning/20 text-warning-foreground border-warning/40" };
  return { label: "Stretch match", className: "bg-muted text-muted-foreground border-border" };
}

export function OpportunityCard({
  opportunity,
  onOpen,
}: {
  opportunity: Opportunity;
  onOpen: (o: Opportunity) => void;
}) {
  const { saved, toggleSave } = useAppStore();
  const isSaved = saved.includes(opportunity.id);
  const tone = matchTone(opportunity.matchScore);

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-soft">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{opportunity.type}</Badge>
          <Badge variant="outline">{opportunity.remote}</Badge>
          {opportunity.verified ? (
            <Badge className="border-success/30 bg-success/15 text-success" variant="outline">
              <BadgeCheck className="mr-1 size-3.5" aria-hidden="true" /> Verified employer
            </Badge>
          ) : (
            <Badge variant="outline" className="border-warning/40 bg-warning/15 text-warning-foreground">
              Awaiting verification
            </Badge>
          )}
        </div>
        <h3 className="text-lg font-semibold leading-snug">{opportunity.title}</h3>
        <p className="text-sm text-muted-foreground">{opportunity.organisation}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <ul className="grid gap-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" aria-hidden="true" /> {opportunity.city}, {opportunity.province}
          </li>
          <li className="flex items-center gap-2">
            <Wallet className="size-4 shrink-0" aria-hidden="true" /> {opportunity.stipend}
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" aria-hidden="true" /> Closes{" "}
            {new Date(opportunity.closingDate).toLocaleDateString("en-ZA", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </li>
        </ul>

        <div className="rounded-lg border border-border bg-muted/50 p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <Sparkles className="size-4 text-accent" aria-hidden="true" /> AI match
            </span>
            <Badge variant="outline" className={tone.className}>
              {opportunity.matchScore}% · {tone.label}
            </Badge>
          </div>
          <Progress
            value={opportunity.matchScore}
            className="mt-2 h-2"
            aria-label={`AI match score ${opportunity.matchScore} percent`}
          />
          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{opportunity.matchReasons[0]}</p>
        </div>

        <div className="mt-auto flex gap-2">
          <Button className="flex-1" onClick={() => onOpen(opportunity)}>
            View & apply
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="min-h-11 min-w-11"
            aria-label={isSaved ? `Remove ${opportunity.title} from saved` : `Save ${opportunity.title}`}
            aria-pressed={isSaved}
            onClick={() => toggleSave(opportunity.id)}
          >
            {isSaved ? <BookmarkCheck className="size-5 text-primary" /> : <Bookmark className="size-5" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
