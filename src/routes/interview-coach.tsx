import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessagesSquare, RefreshCw, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/interview-coach")({
  head: () => ({
    meta: [
      { title: "Interview Coach | GradLink AI" },
      {
        name: "description",
        content:
          "Practise common South African interview questions and get structured STAR feedback from the GradLink AI Interview Coach.",
      },
      { property: "og:title", content: "Interview Coach | GradLink AI" },
      { property: "og:description", content: "Rehearse real interview questions and get instant, structured feedback." },
    ],
  }),
  component: InterviewCoach,
});

const QUESTIONS = [
  { q: "Tell me about yourself.", tip: "Two minutes: who you are, what you studied, what you want next." },
  { q: "Why do you want to work for this organisation?", tip: "Name something specific about them, not generic praise." },
  { q: "Describe a time you worked in a team that had a conflict.", tip: "Use STAR and end on what changed." },
  { q: "You have no formal work experience. Why should we hire you?", tip: "Projects, volunteering, part-time work all count." },
  { q: "Where do you see yourself in three years?", tip: "Show ambition tied to their pathway, not another company." },
  { q: "How do you handle a deadline you are going to miss?", tip: "Early communication, then a plan." },
];

function feedback(answer: string) {
  const words = answer.trim().split(/\s+/).filter(Boolean).length;
  const hasResult = /\b(result|increased|reduced|passed|achieved|saved|%|marks|grew)\b/i.test(answer);
  const hasI = /\bI\b/.test(answer);
  const score = Math.min(95, 40 + Math.min(words, 120) / 3 + (hasResult ? 15 : 0) + (hasI ? 8 : 0));
  return {
    score: Math.round(score),
    strengths: [
      words > 60 ? "Good length — enough detail for an interviewer to follow." : "Clear and to the point.",
      hasI ? "You own your contribution by saying 'I' rather than only 'we'." : "You describe the context well.",
    ],
    improve: [
      hasResult ? "Tighten the ending so the result is the last thing they hear." : "Add a measurable result — a number, a mark, a time saved.",
      words < 60 ? "Expand slightly: name the situation, your task, and what you actually did." : "Trim any背 background that does not change the outcome.",
      "Practise saying it out loud once — written answers sound stiff when spoken.",
    ],
  };
}

function InterviewCoach() {
  const [index, setIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState("");
  const [result, setResult] = React.useState<ReturnType<typeof feedback> | null>(null);
  const question = QUESTIONS[index]!;

  const next = () => {
    setIndex((i) => (i + 1) % QUESTIONS.length);
    setAnswer("");
    setResult(null);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Interview Coach"
        title="Practise before it counts"
        description="Answer in writing first — it is the fastest way to find the gaps in your story. Then say it out loud twice."
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary">
                Question {index + 1} of {QUESTIONS.length}
              </Badge>
              <Button variant="ghost" size="sm" onClick={next}>
                <RefreshCw className="mr-1.5 size-4" aria-hidden="true" /> Next question
              </Button>
            </div>
            <CardTitle className="mt-3 text-xl">{question.q}</CardTitle>
            <p className="text-sm text-muted-foreground">{question.tip}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="answer">Your answer</Label>
            <Textarea
              id="answer"
              rows={9}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Situation… Task… Action… Result…"
            />
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setResult(feedback(answer))} disabled={answer.trim().length < 15}>
                <Sparkles className="mr-2 size-4" aria-hidden="true" /> Get feedback
              </Button>
              {answer ? (
                <Button variant="ghost" onClick={() => { setAnswer(""); setResult(null); }}>
                  Clear
                </Button>
              ) : null}
            </div>

            {result ? (
              <div className="space-y-4 rounded-lg border border-border bg-muted/50 p-4">
                <div>
                  <p className="text-sm font-medium">Answer strength: {result.score}%</p>
                  <Progress value={result.score} className="mt-2 h-2" aria-label={`Answer strength ${result.score} percent`} />
                </div>
                <div>
                  <p className="text-sm font-semibold">What worked</p>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    {result.strengths.map((s) => (
                      <li key={s} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold">Do this next time</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {result.improve.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <AiDisclaimer />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border p-8 text-center">
                <MessagesSquare className="size-8 text-muted-foreground" aria-hidden="true" />
                <p className="text-sm font-medium">No feedback yet</p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Write at least a few sentences and tap "Get feedback" to see strengths and one concrete improvement.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">The STAR method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">S</strong>ituation — where and when.</p>
              <p><strong className="text-foreground">T</strong>ask — what you had to do.</p>
              <p><strong className="text-foreground">A</strong>ction — what you personally did.</p>
              <p><strong className="text-foreground">R</strong>esult — what changed, with a number if possible.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">On the day</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Confirm the address and travel time the night before.</p>
              <p>Take certified copies of your ID and qualifications.</p>
              <p>Prepare two questions to ask them — it is always noticed.</p>
              <p>Ask about training, supervision and whether learners are absorbed afterwards.</p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
