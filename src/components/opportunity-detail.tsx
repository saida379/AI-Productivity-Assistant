import * as React from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, BadgeCheck, CheckCircle2, Flag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { Opportunity } from "@/data/opportunities";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/lib/app-store";
import { matchTone } from "@/components/opportunity-card";

export function OpportunityDetail({
  opportunity,
  onOpenChange,
}: {
  opportunity: Opportunity | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { saved, toggleSave, addApplication, applications } = useAppStore();
  const [reported, setReported] = React.useState(false);

  React.useEffect(() => setReported(false), [opportunity?.id]);

  if (!opportunity) return null;
  const tone = matchTone(opportunity.matchScore);
  const tracked = applications.some((a) => a.opportunityId === opportunity.id);

  return (
    <Dialog open={!!opportunity} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{opportunity.type}</Badge>
            <Badge variant="outline">{opportunity.remote}</Badge>
            {opportunity.verified ? (
              <Badge variant="outline" className="border-success/30 bg-success/15 text-success">
                <BadgeCheck className="mr-1 size-3.5" aria-hidden="true" /> Verified employer
              </Badge>
            ) : null}
          </div>
          <DialogTitle className="text-xl">{opportunity.title}</DialogTitle>
          <DialogDescription>
            {opportunity.organisation} · {opportunity.city}, {opportunity.province}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 text-sm">
          <p className="text-muted-foreground">{opportunity.summary}</p>

          <dl className="grid gap-3 rounded-lg border border-border bg-muted/40 p-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Stipend / salary</dt>
              <dd className="font-medium">{opportunity.stipend}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Minimum level</dt>
              <dd className="font-medium">{opportunity.nqf}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Closing date</dt>
              <dd className="font-medium">
                {new Date(opportunity.closingDate).toLocaleDateString("en-ZA", { dateStyle: "long" })}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">Field</dt>
              <dd className="font-medium">{opportunity.fields.join(", ")}</dd>
            </div>
          </dl>

          <section>
            <h4 className="flex items-center gap-2 font-semibold">
              <Sparkles className="size-4 text-accent" aria-hidden="true" /> Why the AI matched you{" "}
              <Badge variant="outline" className={tone.className}>
                {opportunity.matchScore}%
              </Badge>
            </h4>
            <ul className="mt-2 space-y-1.5">
              {opportunity.matchReasons.map((r) => (
                <li key={r} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  <span className="text-muted-foreground">{r}</span>
                </li>
              ))}
            </ul>
            {opportunity.gaps.length ? (
              <ul className="mt-3 space-y-1.5">
                {opportunity.gaps.map((g) => (
                  <li key={g} className="flex gap-2">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
                    <span className="text-muted-foreground">{g}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <AiDisclaimer className="mt-3" />
          </section>

          <section>
            <h4 className="font-semibold">Requirements</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              {opportunity.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>

          <Separator />

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                addApplication(opportunity.id);
                toast.success("Added to your application tracker", {
                  description: "Move it through the stages on your dashboard.",
                });
              }}
              disabled={tracked}
            >
              {tracked ? "Already tracked" : "Apply & track"}
            </Button>
            <Button variant="outline" asChild>
              <Link to="/application-assistant" search={{ opportunity: opportunity.id }}>
                Draft with Application Assistant
              </Link>
            </Button>
            <Button variant="ghost" onClick={() => toggleSave(opportunity.id)}>
              {saved.includes(opportunity.id) ? "Unsave" : "Save for later"}
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground"
              onClick={() => {
                setReported(true);
                toast("Reported to our trust & safety team", {
                  description: "We review scam reports within 24 hours.",
                });
              }}
              disabled={reported}
            >
              <Flag className="mr-1 size-4" aria-hidden="true" /> {reported ? "Reported" : "Report this listing"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
