import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, BadgeCheck, Flag, Lock, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/trust-safety")({
  head: () => ({
    meta: [
      { title: "Trust & safety | GradLink AI" },
      {
        name: "description",
        content:
          "How GradLink AI verifies employers, protects your personal information under POPIA, and helps you spot job scams in South Africa.",
      },
      { property: "og:title", content: "Trust & safety | GradLink AI" },
      { property: "og:description", content: "Employer verification, scam warning signs and POPIA-aligned data protection." },
    ],
  }),
  component: TrustSafety,
});

const SCAM_SIGNS = [
  "You are asked to pay a registration, training, uniform or 'admin' fee.",
  "The 'employer' only uses a Gmail address or a WhatsApp number, never a company domain.",
  "You are offered a job without any interview or assessment.",
  "You are asked for your banking PIN, SASSA details, or a copy of your card.",
  "The advert has no closing date, no company registration name and no physical address.",
  "You are pressured to decide within hours.",
];

function TrustSafety() {
  return (
    <div>
      <PageHeader
        eyebrow="Trust & safety"
        title="You should never pay for a job"
        description="Job scams target unemployed young people hardest. Here is exactly what we do to keep listings safe, and how to protect yourself anywhere online."
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3">
        {[
          {
            icon: BadgeCheck,
            title: "Employer verification",
            body: "Before a first listing goes live we check CIPC company registration, a working company domain, and a named contact person. Verified listings carry a badge; unverified ones are labelled.",
          },
          {
            icon: Flag,
            title: "One-tap reporting",
            body: "Every listing has a report button. Reports are reviewed within 24 hours, and a listing with multiple credible reports is suspended immediately while we investigate.",
          },
          {
            icon: Lock,
            title: "Your data, POPIA-aligned",
            body: "We collect only what matching needs, never sell personal information, and let you export or delete your profile at any time. We never share your ID number with employers.",
          },
        ].map((c) => (
          <Card key={c.title}>
            <CardHeader>
              <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                <c.icon className="size-5" aria-hidden="true" />
              </span>
              <CardTitle className="mt-3 text-lg">{c.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{c.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-warning" aria-hidden="true" /> Warning signs of a scam
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {SCAM_SIGNS.map((s) => (
                <li key={s} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-success" aria-hidden="true" /> Our promises to you
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">GradLink AI is free for students and job seekers. Always.</p>
            <p>We will never ask you to pay for a listing, a match, a CV review or an interview.</p>
            <p>We will never contact you asking for banking details or a one-time PIN.</p>
            <p>We do not guarantee employment — and we treat anyone who does as a red flag.</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild variant="outline">
                <Link to="/about">Responsible AI commitments</Link>
              </Button>
              <Button asChild>
                <Link to="/opportunities">Back to the hub</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
