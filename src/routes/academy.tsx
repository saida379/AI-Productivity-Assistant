import { createFileRoute } from "@tanstack/react-router";
import { Award, PlayCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { academyModules } from "@/data/opportunities";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "Career Launch Academy | GradLink AI" },
      {
        name: "description",
        content:
          "Free short courses on CVs, interviews, digital literacy and money basics for South African students and job seekers.",
      },
      { property: "og:title", content: "Career Launch Academy | GradLink AI" },
      { property: "og:description", content: "Track your progress through free employability modules built for SA youth." },
    ],
  }),
  component: Academy,
});

function Academy() {
  const totalLessons = academyModules.reduce((s, m) => s + m.lessons, 0);
  const done = academyModules.reduce((s, m) => s + m.completed, 0);
  const overall = Math.round((done / totalLessons) * 100);

  return (
    <div>
      <PageHeader
        eyebrow="Career Launch Academy"
        title="Short courses that make you employable"
        description="Every module is under 90 minutes, works on a phone, and ends with something you can put on your CV."
      >
        <Card className="max-w-xl">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="font-medium">Overall progress</p>
              <Badge variant="secondary">
                {done} of {totalLessons} lessons
              </Badge>
            </div>
            <Progress value={overall} className="mt-3" aria-label={`Academy ${overall} percent complete`} />
            <p className="mt-2 text-sm text-muted-foreground">
              {overall}% complete · finish two more modules to unlock your Employability Certificate (demo).
            </p>
          </CardContent>
        </Card>
      </PageHeader>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {academyModules.map((m) => {
          const pct = Math.round((m.completed / m.lessons) * 100);
          return (
            <Card key={m.id} className="flex h-full flex-col">
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  {m.skill}
                </Badge>
                <CardTitle className="mt-2 text-lg leading-snug">{m.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {m.lessons} lessons · {m.minutes} min
                </p>
              </CardHeader>
              <CardContent className="mt-auto space-y-3">
                <Progress value={pct} className="h-2" aria-label={`${m.title} ${pct} percent complete`} />
                <p className="text-sm text-muted-foreground">
                  {m.completed === 0 ? "Not started" : m.completed === m.lessons ? "Completed" : `${pct}% complete`}
                </p>
                <Button variant={m.completed === m.lessons ? "outline" : "default"} className="w-full">
                  {m.completed === m.lessons ? (
                    <>
                      <Award className="mr-2 size-4" aria-hidden="true" /> Review module
                    </>
                  ) : (
                    <>
                      <PlayCircle className="mr-2 size-4" aria-hidden="true" />
                      {m.completed === 0 ? "Start module" : "Continue"}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
