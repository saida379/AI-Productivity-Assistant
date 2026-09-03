import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/lib/app-store";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "AI Career Coach | GradLink AI" },
      {
        name: "description",
        content:
          "Chat with the GradLink AI Career Coach about study choices, career direction, CVs and next steps — built for South African youth.",
      },
      { property: "og:title", content: "AI Career Coach | GradLink AI" },
      {
        property: "og:description",
        content: "Practical, plain-language career guidance for South African students, graduates and job seekers.",
      },
    ],
  }),
  component: Coach,
});

type Msg = { id: string; role: "user" | "coach"; text: string };

const PROMPTS = [
  "I finished matric but I can't afford university. What now?",
  "How do I explain a gap year in an interview?",
  "Which careers use my BCom if I don't want accounting?",
  "How do I write a CV with no work experience?",
  "Is this learnership stipend enough to live on in Joburg?",
];

function reply(input: string, name: string): string {
  const q = input.toLowerCase();
  if (q.includes("matric") || q.includes("afford") || q.includes("nsfas") || q.includes("bursary")) {
    return `There are three realistic routes with a matric certificate, ${name}. One: an accredited learnership — you earn a stipend while you study towards an NQF qualification. Two: a TVET college NC(V) or Report 191 programme, which is far cheaper than university and NSFAS-funded. Three: a YES programme placement for 12 months of paid work experience. I'd start by filtering the Opportunity Hub to "Learnership" and your province. Want me to point out which of those close this month?`;
  }
  if (q.includes("cv") || q.includes("resume") || q.includes("no work experience")) {
    return `A no-experience CV still has plenty to say. Lead with a 3-line summary naming the role you want. Then list your qualification with relevant modules, then projects (assignments, volunteering, church or community work, a side hustle), then skills split into technical and interpersonal. Keep it to two pages, use the same word the advert uses for the role, and add your ID availability and location. Upload your CV in the dashboard and I'll point out the weakest section.`;
  }
  if (q.includes("interview") || q.includes("gap")) {
    return `Be honest and short about a gap, then pivot to what you did with the time — studying online, family responsibilities, piece jobs, volunteering all count. Use the STAR shape: Situation, Task, Action, Result. Practise it out loud twice before the day. The Interview Coach page has South African-style questions you can rehearse with feedback.`;
  }
  if (q.includes("bcom") || q.includes("career") || q.includes("which") || q.includes("direction")) {
    return `A BCom opens more doors than accounting: business analysis, procurement and supply chain, banking operations, HR and people analytics, project coordination, and sales engineering all hire BCom graduates. Pick two of those, look at three live adverts for each, and note the repeated skills — that is your study list. I can shortlist matching graduate programmes in the hub if you tell me your province.`;
  }
  if (q.includes("stipend") || q.includes("salary") || q.includes("money") || q.includes("enough")) {
    return `Budget it before you accept. A R4 500 stipend in Johannesburg typically goes: transport R900–R1 400, data R200, food R1 200, contribution at home, and whatever is left. It is usually worth it if the qualification is accredited and the host employer has a track record of absorbing learners — ask that question directly in the interview. The Academy has a short module on managing a first income.`;
  }
  return `Thanks ${name} — here's how I'd approach that. First, get specific about the outcome you want in the next 90 days (a placement, a qualification, or income). Second, pick the two opportunity types that realistically deliver it and filter the hub for them. Third, close one visible gap on your profile this week — usually the CV summary or a missing skill. Tell me your field and province and I'll be more concrete.`;
}

function Coach() {
  const { profile } = useAppStore();
  const firstName = profile.fullName.split(" ")[0] ?? "there";
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [thinking, setThinking] = React.useState(false);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || thinking) return;
    setMessages((m) => [...m, { id: `u${Date.now()}`, role: "user", text: value }]);
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: `c${Date.now()}`, role: "coach", text: reply(value, firstName) }]);
      setThinking(false);
    }, 700);
  };

  return (
    <div>
      <PageHeader
        eyebrow="AI Career Coach"
        title="Ask anything about your career"
        description="No question is too basic. The coach knows the South African context — NQF levels, SETAs, learnerships, NSFAS, YES programmes and TVET pathways."
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
        <Card className="flex min-h-[540px] flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="grid size-8 place-items-center rounded-full bg-secondary text-primary">
                <Bot className="size-4" aria-hidden="true" />
              </span>
              GradLink Coach
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4 pt-6">
            <div className="flex-1 space-y-4 overflow-y-auto" role="log" aria-live="polite" aria-label="Conversation">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border p-8 text-center">
                  <span className="grid size-14 place-items-center rounded-full bg-secondary text-primary">
                    <Sparkles className="size-6" aria-hidden="true" />
                  </span>
                  <h2 className="text-lg font-semibold">Start the conversation</h2>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Tell the coach where you are right now — studying, just graduated, or looking for anything. Or tap
                    one of the starter questions.
                  </p>
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex gap-3"}>
                    {m.role === "coach" ? (
                      <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                        <Bot className="size-4" aria-hidden="true" />
                      </span>
                    ) : null}
                    <p
                      className={
                        m.role === "user"
                          ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm text-primary-foreground"
                          : "max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-4 py-3 text-sm"
                      }
                    >
                      {m.text}
                    </p>
                    {m.role === "user" ? (
                      <span className="ml-3 mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                        <User className="size-4" aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>
                ))
              )}
              {thinking ? <p className="text-sm text-muted-foreground">Coach is thinking…</p> : null}
            </div>

            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <Label htmlFor="coach-input" className="sr-only">
                Message the coach
              </Label>
              <Input
                id="coach-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="h-12"
              />
              <Button type="submit" className="h-12 min-w-12" aria-label="Send message" disabled={!input.trim()}>
                <Send className="size-4" aria-hidden="true" />
              </Button>
            </form>
            <AiDisclaimer />
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Starter questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="w-full rounded-lg border border-border p-3 text-left text-sm transition-colors hover:bg-muted"
                >
                  {p}
                </button>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What the coach can see</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                Your profile: {profile.qualification}, {profile.province}. Skills: {profile.skills.join(", ")}.
              </p>
              <p className="mt-2">Update your profile in the dashboard to sharpen the advice.</p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
