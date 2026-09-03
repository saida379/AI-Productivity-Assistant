import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Eye, HeartHandshake, Target } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Mission, vision & impact | GradLink AI" },
      {
        name: "description",
        content:
          "Why GradLink AI exists: closing the gap between South African youth and the opportunities already available to them.",
      },
      { property: "og:title", content: "Mission, vision & impact | GradLink AI" },
      { property: "og:description", content: "Our mission, vision, impact measures and responsible AI commitments." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="Opportunity is not scarce. Access is."
        description="GradLink AI exists because opportunities for young South Africans are real but scattered, badly explained, and often unsafe to navigate alone."
      />

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6">
        <section className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Mission",
              body: "To put every South African student, graduate and unemployed young person one clear step away from their next opportunity — with guidance they can understand and act on today.",
            },
            {
              icon: Eye,
              title: "Vision",
              body: "A country where your access to work depends on your effort and potential, not on who you know, which province you were born in, or whether you can afford data.",
            },
            {
              icon: HeartHandshake,
              title: "Values",
              body: "Free for youth. Honest about what AI can and cannot do. Safe by default. Built with TVET students, not only university graduates.",
            },
          ].map((v) => (
            <Card key={v.title}>
              <CardHeader>
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                  <v.icon className="size-5" aria-hidden="true" />
                </span>
                <CardTitle className="mt-3 text-lg">{v.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{v.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold">How we measure impact</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            We deliberately do not measure success in "jobs guaranteed", because no platform can guarantee that. We
            measure the things we can genuinely influence.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["7 400", "applications completed by users (demo)"],
              ["2 130", "Academy modules finished"],
              ["61%", "of active users reached interview stage"],
              ["9", "provinces with live listings"],
            ].map(([value, label]) => (
              <Card key={label}>
                <CardContent className="pt-6">
                  <p className="font-display text-3xl font-bold text-primary">{value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="size-5 text-accent" aria-hidden="true" /> Responsible AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Guidance, not guarantees.</strong> GradLink AI does not promise
                employment, placement, bursary funding or any specific outcome. Hiring decisions belong to employers
                and institutions.
              </p>
              <p>
                <strong className="text-foreground">Explainable matching.</strong> Every match score shows the reasons
                behind it and the gaps it found, so you can challenge it. A low score never blocks you from applying.
              </p>
              <p>
                <strong className="text-foreground">Human in the loop.</strong> AI never rejects a candidate on its
                own. Employers see reasoning, and candidates can request a human review of any shortlist decision.
              </p>
              <p>
                <strong className="text-foreground">Fairness.</strong> We do not use race, gender, home language or
                surname as matching signals, and we test regularly for bias toward urban and university candidates over
                rural and TVET ones.
              </p>
              <p>
                <strong className="text-foreground">Your data.</strong> Your profile is yours. You can export or delete
                it at any time, and we never sell personal information. We follow POPIA.
              </p>
              <AiDisclaimer />
              <Button asChild variant="outline" className="mt-2">
                <Link to="/trust-safety">See our trust & safety measures</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
