import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Copy, FileSignature, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { opportunities } from "@/data/opportunities";
import { useAppStore } from "@/lib/app-store";

const searchSchema = z.object({ opportunity: z.string().optional() });

export const Route = createFileRoute("/application-assistant")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Application Assistant | GradLink AI" },
      {
        name: "description",
        content:
          "Draft a tailored cover letter and motivation for South African learnerships, internships and graduate programmes.",
      },
      { property: "og:title", content: "Application Assistant | GradLink AI" },
      { property: "og:description", content: "AI-drafted cover letters and motivations you edit in your own voice." },
    ],
  }),
  component: Assistant,
});

function Assistant() {
  const { opportunity: initial } = Route.useSearch();
  const { profile } = useAppStore();
  const [oppId, setOppId] = React.useState(initial ?? opportunities[0]!.id);
  const [motivation, setMotivation] = React.useState("");
  const [draft, setDraft] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const opp = opportunities.find((o) => o.id === oppId)!;

  const generate = () => {
    setBusy(true);
    window.setTimeout(() => {
      setDraft(
        `Dear ${opp.organisation} Recruitment Team,

I am applying for the ${opp.title} advertised on GradLink AI. I am a ${profile.qualification} graduate of ${profile.institution}, based in ${profile.province}${profile.openToRelocate ? " and open to relocating" : ""}.

${opp.matchReasons[0]}. Practically, that means I have worked with ${profile.skills.slice(0, 3).join(", ")} on academic and personal projects, and I am comfortable learning the rest on the job.

${motivation.trim() || `What draws me to ${opp.organisation} specifically is the structured support this programme offers early-career people. I want to build a long career, not just take a first job.`}

${opp.gaps.length ? `I note the advert mentions ${opp.gaps[0]!.toLowerCase()}. I am actively addressing this and would welcome the chance to explain how.` : ""}

I have attached my CV and certified copies of my qualifications, and I am available to start immediately.

Kind regards,
${profile.fullName}`.replace(/\n{3,}/g, "\n\n"),
      );
      setBusy(false);
    }, 800);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Application Assistant"
        title="Write a stronger application"
        description="Pick an opportunity, add anything personal you want mentioned, and the assistant drafts a cover letter you can edit and make your own."
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileSignature className="size-4 text-primary" aria-hidden="true" /> Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="opp">Opportunity</Label>
              <Select value={oppId} onValueChange={setOppId}>
                <SelectTrigger id="opp">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {opportunities.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      {o.title} — {o.organisation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm">
              <p className="font-medium">{opp.title}</p>
              <p className="text-muted-foreground">
                {opp.organisation} · {opp.city} · closes{" "}
                {new Date(opp.closingDate).toLocaleDateString("en-ZA", { dateStyle: "medium" })}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Anything personal you want included (optional)</Label>
              <Textarea
                id="motivation"
                rows={5}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="e.g. I tutored maths at my old school for two years and I want to work somewhere that trains people properly."
              />
            </div>

            <Button onClick={generate} disabled={busy} className="w-full">
              <Sparkles className="mr-2 size-4" aria-hidden="true" />
              {busy ? "Drafting…" : "Draft my cover letter"}
            </Button>
            <AiDisclaimer>
              Never send an AI draft unedited. Employers can tell. Change at least the opening and closing lines so it
              sounds like you — and check every fact before you submit.
            </AiDisclaimer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your draft</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {draft ? (
              <>
                <Label htmlFor="draft" className="sr-only">
                  Cover letter draft
                </Label>
                <Textarea id="draft" rows={20} value={draft} onChange={(e) => setDraft(e.target.value)} />
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      void navigator.clipboard?.writeText(draft);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    <Copy className="mr-2 size-4" aria-hidden="true" /> Copy
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/dashboard">Track this application</Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border p-10 text-center">
                <span className="grid size-14 place-items-center rounded-full bg-secondary text-primary">
                  <FileSignature className="size-6" aria-hidden="true" />
                </span>
                <p className="text-sm font-medium">No draft yet</p>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Choose an opportunity on the left and tap "Draft my cover letter". Your draft appears here, fully
                  editable.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
