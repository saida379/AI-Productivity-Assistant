import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, GraduationCap, Handshake } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { OpportunityCard } from "@/components/opportunity-card";
import { OpportunityDetail } from "@/components/opportunity-detail";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { opportunities, wilPartners, type Opportunity } from "@/data/opportunities";

export const Route = createFileRoute("/wil-connect")({
  head: () => ({
    meta: [
      { title: "WIL Connect | GradLink AI" },
      {
        name: "description",
        content:
          "Work Integrated Learning placements linking South African TVET and university students to host employers for the workplace hours they need to qualify.",
      },
      { property: "og:title", content: "WIL Connect | GradLink AI" },
      { property: "og:description", content: "P1/P2 and experiential training placements for TVET and university students." },
    ],
  }),
  component: Wil,
});

function Wil() {
  const [selected, setSelected] = React.useState<Opportunity | null>(null);
  const placements = opportunities.filter((o) => o.type === "WIL Placement" || o.type === "Internship");

  return (
    <div>
      <PageHeader
        eyebrow="WIL Connect"
        title="Work Integrated Learning placements"
        description="Thousands of South African students finish their coursework but cannot graduate because they never get the workplace hours. WIL Connect matches students who need P1/P2 or experiential training to host employers who have capacity."
      />

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6">
        <section className="grid gap-5 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: "1. Institution verifies you", body: "Your college or university confirms your subjects and the hours you still need." },
            { icon: Handshake, title: "2. AI matches capacity", body: "We match your programme to host employers with open, accredited seats in your province." },
            { icon: Building2, title: "3. Placement is logged", body: "Hours are recorded and signed off so your qualification can be completed." },
          ].map((s) => (
            <Card key={s.title}>
              <CardHeader>
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                  <s.icon className="size-5" aria-hidden="true" />
                </span>
                <CardTitle className="mt-3 text-lg">{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold">Partner institutions</h2>
          <p className="mt-2 text-muted-foreground">Demo partners currently listing WIL capacity.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {wilPartners.map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {p.province}
                  </Badge>
                  <CardTitle className="mt-2 text-lg">{p.institution}</CardTitle>
                  <p className="text-sm text-muted-foreground">{p.programme}</p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="font-medium text-primary">{p.seats} placement seats open</p>
                  <p className="text-muted-foreground">Host employers: {p.hostEmployers.join(", ")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Open placements</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {placements.map((o) => (
              <OpportunityCard key={o.id} opportunity={o} onOpen={setSelected} />
            ))}
          </div>
          <AiDisclaimer className="mt-6">
            WIL matching is a coordination tool. Placement depends on your institution's sign-off and the host
            employer's decision — GradLink AI cannot guarantee a seat.
          </AiDisclaimer>
        </section>
      </div>

      <OpportunityDetail opportunity={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  );
}
