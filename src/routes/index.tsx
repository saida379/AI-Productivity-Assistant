import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Briefcase,
  GraduationCap,
  LineChart,
  MessagesSquare,
  School,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { opportunities } from "@/data/opportunities";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GradLink AI | Careers & opportunities for SA youth" },
      {
        name: "description",
        content:
          "GradLink AI connects South African students, graduates and unemployed youth to learnerships, internships, bursaries and jobs with AI coaching and CV support.",
      },
      { property: "og:title", content: "GradLink AI | Careers & opportunities for SA youth" },
      {
        property: "og:description",
        content:
          "AI career coaching, a verified opportunity hub, WIL placements and free employability training for South African youth.",
      },
    ],
  }),
  component: Home,
});

const FEATURES = [
  {
    icon: Bot,
    title: "AI Career Coach",
    body: "Talk through your studies, strengths and worries and get a practical next step — in plain language.",
    to: "/coach" as const,
  },
  {
    icon: Briefcase,
    title: "Opportunity Hub",
    body: "Learnerships, internships, bursaries, graduate programmes and entry-level jobs, filtered by province and NQF level.",
    to: "/opportunities" as const,
  },
  {
    icon: School,
    title: "WIL Connect",
    body: "Work Integrated Learning placements matched to TVET and university students who need workplace hours.",
    to: "/wil-connect" as const,
  },
  {
    icon: GraduationCap,
    title: "Career Launch Academy",
    body: "Short, free modules on CVs, interviews, digital literacy and money basics — with progress tracking.",
    to: "/academy" as const,
  },
  {
    icon: MessagesSquare,
    title: "Interview Coach",
    body: "Practise real South African interview questions and get structured feedback using the STAR method.",
    to: "/interview-coach" as const,
  },
  {
    icon: LineChart,
    title: "Application tracker",
    body: "A simple Kanban board so you always know what you applied for and what is coming next.",
    to: "/dashboard" as const,
  },
];

function Home() {
  const featured = opportunities.slice(0, 3);

  return (
    <div>
      <section className="hero-gradient text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Badge variant="outline" className="border-white/30 bg-white/10 text-primary-foreground">
              <Sparkles className="mr-1.5 size-3.5" aria-hidden="true" /> Built for South African youth
            </Badge>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Your next opportunity, explained by AI.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">
              GradLink AI helps students, graduates and unemployed young people find learnerships, internships,
              bursaries and first jobs — and understand exactly why each one fits, and what is still missing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/opportunities">
                  Browse opportunities <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <Link to="/coach">Talk to the AI Coach</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-primary-foreground">
              {[
                ["12", "demo opportunities"],
                ["9", "provinces covered"],
                ["R0", "cost to students"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold">{value}</span>
                    <span className="text-sm text-primary-foreground/80">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Card className="self-center border-white/20 bg-white/10 text-primary-foreground backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bot className="size-4" aria-hidden="true" /> Coach preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-white/20 px-4 py-3">
                I finished my BSc last year and I still have no job. Where do I even start?
              </p>
              <p className="max-w-[92%] rounded-2xl rounded-bl-sm bg-background/95 px-4 py-3 text-foreground">
                Let's start small. Your degree already qualifies you for graduate programmes closing this month. I'd
                shortlist two, fix the summary at the top of your CV, and register for the free interview module. Want
                me to show the two closest matches?
              </p>
              <AiDisclaimer className="border-white/20 bg-white/10 text-primary-foreground/85" />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold md:text-3xl">Everything you need in one place</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          From figuring out a direction to tracking your applications — each tool works on a phone, on data you can
          afford.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="h-full transition-shadow hover:shadow-soft">
              <CardHeader>
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                  <f.icon className="size-5" aria-hidden="true" />
                </span>
                <CardTitle className="mt-3 text-lg">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{f.body}</p>
                <Link
                  to={f.to}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Open {f.title} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Opportunities closing soon</h2>
              <p className="mt-2 text-muted-foreground">Demo listings from across South Africa.</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/opportunities">See all 12</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featured.map((o) => (
              <Card key={o.id} className="h-full">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {o.type}
                  </Badge>
                  <CardTitle className="mt-2 text-base leading-snug">{o.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {o.organisation} · {o.province}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">{o.stipend}</p>
                  <p className="flex items-center gap-1.5 font-medium text-primary">
                    <Sparkles className="size-4" aria-hidden="true" /> {o.matchScore}% AI match
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/opportunities">View in the hub</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="size-5 text-accent" aria-hidden="true" /> Our mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              South Africa has one of the highest youth unemployment rates in the world. Opportunities exist — they are
              just scattered, badly explained and often unsafe. GradLink AI brings them together and explains them in
              language young people actually use.
            </p>
            <p>
              We measure ourselves on applications completed, skills gained and interviews secured — not on promises we
              cannot keep.
            </p>
            <Button asChild variant="outline" className="mt-2">
              <Link to="/about">Read our mission, vision & impact</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-success" aria-hidden="true" /> Safe by default
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Employers are verified before listings go live, and every listing can be reported in one tap.</p>
            <p className="font-medium text-foreground">We will never ask you to pay for a job or a learnership.</p>
            <Button asChild variant="outline" size="sm">
              <Link to="/trust-safety">Trust & safety</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <AiDisclaimer>
          GradLink AI provides guidance, not guarantees. We do not promise employment, placement, bursary funding or
          any specific outcome. AI suggestions can be wrong — always confirm details with the official employer or
          institution.
        </AiDisclaimer>
      </section>
    </div>
  );
}
