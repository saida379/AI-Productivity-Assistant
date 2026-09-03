import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Building2, Users } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/employers")({
  head: () => ({
    meta: [
      { title: "Employer portal | GradLink AI" },
      {
        name: "description",
        content:
          "Post learnerships, internships, WIL placements and entry-level roles to verified South African youth talent on GradLink AI.",
      },
      { property: "og:title", content: "Employer portal | GradLink AI" },
      { property: "og:description", content: "Reach verified SA student and graduate talent, with B-BBEE and YES-aligned reporting." },
    ],
  }),
  component: Employers,
});

const PIPELINE = [
  { role: "Software Development Graduate Programme", applicants: 148, shortlisted: 22, interviews: 8, status: "Live" },
  { role: "Data Analyst Internship", applicants: 96, shortlisted: 15, interviews: 5, status: "Live" },
  { role: "MICT SETA IT Support Learnership", applicants: 312, shortlisted: 40, interviews: 12, status: "Closing soon" },
  { role: "Junior Frontend Developer", applicants: 61, shortlisted: 9, interviews: 3, status: "Draft" },
];

function Employers() {
  return (
    <div>
      <PageHeader
        eyebrow="Employer portal"
        title="Hire young South African talent"
        description="Post an opportunity, get AI-ranked shortlists with the reasoning shown, and export reporting for your YES, SETA or B-BBEE skills development commitments."
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3">
        {[
          { icon: Users, title: "Reach reached", value: "18 400", body: "Registered youth profiles across all nine provinces (demo figure)." },
          { icon: BadgeCheck, title: "Verification", value: "48 hrs", body: "We verify company registration before your first listing goes live." },
          { icon: Building2, title: "Cost to post", value: "R0", body: "Free during the pilot for learnerships and WIL placements." },
        ].map((s) => (
          <Card key={s.title}>
            <CardHeader>
              <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                <s.icon className="size-5" aria-hidden="true" />
              </span>
              <CardTitle className="mt-3 text-lg">{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_400px]">
        <Card>
          <CardHeader>
            <CardTitle>Your listings</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Applicants</TableHead>
                  <TableHead className="text-right">Shortlisted</TableHead>
                  <TableHead className="text-right">Interviews</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PIPELINE.map((r) => (
                  <TableRow key={r.role}>
                    <TableCell className="font-medium">{r.role}</TableCell>
                    <TableCell className="text-right">{r.applicants}</TableCell>
                    <TableCell className="text-right">{r.shortlisted}</TableCell>
                    <TableCell className="text-right">{r.interviews}</TableCell>
                    <TableCell>
                      <Badge variant={r.status === "Live" ? "secondary" : "outline"}>{r.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <AiDisclaimer className="mt-4">
              AI shortlisting ranks candidates against the criteria you set and always shows its reasoning. It never
              makes the hiring decision, and candidates can request a human review.
            </AiDisclaimer>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">Post an opportunity</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Listing submitted for verification", {
                  description: "Our team reviews new employers within 48 hours.",
                });
                (e.target as HTMLFormElement).reset();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="company">Company name</Label>
                <Input id="company" required placeholder="Registered company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role title</Label>
                <Input id="role" required placeholder="e.g. Finance Graduate Programme 2027" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" rows={5} required placeholder="Responsibilities, requirements, stipend, closing date" />
              </div>
              <Button type="submit" className="w-full">
                Submit for verification
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
