import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, FileText, LayoutGrid, Sparkles, Trash2, Upload, UserRound } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { OpportunityCard } from "@/components/opportunity-card";
import { OpportunityDetail } from "@/components/opportunity-detail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PROVINCES, opportunities, type Opportunity } from "@/data/opportunities";
import { STAGES, useAppStore, type Stage } from "@/lib/app-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My dashboard | GradLink AI" },
      {
        name: "description",
        content: "Manage your profile, CV, saved opportunities and application pipeline in one place on GradLink AI.",
      },
      { property: "og:title", content: "My dashboard | GradLink AI" },
      { property: "og:description", content: "Profile, CV insights, saved opportunities and an application Kanban board." },
    ],
  }),
  component: Dashboard,
});

const byId = (id: string) => opportunities.find((o) => o.id === id);

function Dashboard() {
  const { profile, updateProfile, saved, applications, moveApplication, removeApplication } = useAppStore();
  const [selected, setSelected] = React.useState<Opportunity | null>(null);
  const [skillDraft, setSkillDraft] = React.useState("");

  const savedItems = saved.map(byId).filter(Boolean) as Opportunity[];
  const profileFields = [
    profile.fullName,
    profile.headline,
    profile.institution,
    profile.qualification,
    profile.about,
    profile.skills.length ? "skills" : "",
    profile.hasCv ? "cv" : "",
  ];
  const completeness = Math.round((profileFields.filter(Boolean).length / profileFields.length) * 100);

  return (
    <div>
      <PageHeader
        eyebrow="Dashboard"
        title={`Welcome back, ${profile.fullName.split(" ")[0]}`}
        description="Your profile powers every AI match. Keep it current and the Opportunity Hub gets sharper."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Profile complete", value: `${completeness}%` },
            { label: "Saved opportunities", value: String(saved.length) },
            { label: "Active applications", value: String(applications.filter((a) => a.stage !== "closed").length) },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-6">
                <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Tabs defaultValue="pipeline">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
            <TabsTrigger value="pipeline">
              <LayoutGrid className="mr-1.5 size-4" aria-hidden="true" /> Applications
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="mr-1.5 size-4" aria-hidden="true" /> Saved
            </TabsTrigger>
            <TabsTrigger value="profile">
              <UserRound className="mr-1.5 size-4" aria-hidden="true" /> Profile
            </TabsTrigger>
            <TabsTrigger value="cv">
              <FileText className="mr-1.5 size-4" aria-hidden="true" /> CV
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="mt-6">
            {applications.length === 0 ? (
              <EmptyState
                title="No applications tracked yet"
                body="When you apply from the Opportunity Hub, the application lands here so you can move it through each stage."
                cta={
                  <Button asChild>
                    <Link to="/opportunities">Browse opportunities</Link>
                  </Button>
                }
              />
            ) : (
              <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
                {STAGES.map((stage) => {
                  const items = applications.filter((a) => a.stage === stage.id);
                  return (
                    <section key={stage.id} aria-label={stage.label} className="rounded-xl bg-muted/60 p-3">
                      <header className="flex items-center justify-between px-1 pb-3">
                        <h2 className="text-sm font-semibold">{stage.label}</h2>
                        <Badge variant="secondary">{items.length}</Badge>
                      </header>
                      <p className="px-1 pb-3 text-xs text-muted-foreground">{stage.hint}</p>
                      <div className="space-y-3">
                        {items.length === 0 ? (
                          <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                            Nothing here yet
                          </p>
                        ) : (
                          items.map((app) => {
                            const o = byId(app.opportunityId);
                            if (!o) return null;
                            return (
                              <Card key={app.id}>
                                <CardContent className="space-y-2 pt-4">
                                  <p className="text-sm font-semibold leading-snug">{o.title}</p>
                                  <p className="text-xs text-muted-foreground">{o.organisation}</p>
                                  {app.note ? (
                                    <p className="rounded bg-secondary p-2 text-xs text-secondary-foreground">
                                      {app.note}
                                    </p>
                                  ) : null}
                                  <p className="text-xs text-muted-foreground">Updated {app.updated}</p>
                                  <Label htmlFor={`stage-${app.id}`} className="sr-only">
                                    Move {o.title} to a different stage
                                  </Label>
                                  <Select
                                    value={app.stage}
                                    onValueChange={(v) => moveApplication(app.id, v as Stage)}
                                  >
                                    <SelectTrigger id={`stage-${app.id}`} className="h-9 text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {STAGES.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>
                                          {s.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full text-muted-foreground"
                                    onClick={() => removeApplication(app.id)}
                                  >
                                    <Trash2 className="mr-1 size-3.5" aria-hidden="true" /> Remove
                                  </Button>
                                </CardContent>
                              </Card>
                            );
                          })
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            {savedItems.length === 0 ? (
              <EmptyState
                title="Nothing saved yet"
                body="Tap the bookmark icon on any opportunity to keep it here while you decide."
                cta={
                  <Button asChild>
                    <Link to="/opportunities">Find something to save</Link>
                  </Button>
                }
              />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {savedItems.map((o) => (
                  <OpportunityCard key={o.id} opportunity={o} onOpen={setSelected} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <Card>
                <CardHeader>
                  <CardTitle>Your profile</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" id="fullName" value={profile.fullName} onChange={(v) => updateProfile({ fullName: v })} />
                  <Field label="Headline" id="headline" value={profile.headline} onChange={(v) => updateProfile({ headline: v })} />
                  <Field label="Institution" id="institution" value={profile.institution} onChange={(v) => updateProfile({ institution: v })} />
                  <Field label="Qualification" id="qualification" value={profile.qualification} onChange={(v) => updateProfile({ qualification: v })} />
                  <Field label="Graduation year" id="graduationYear" value={profile.graduationYear} onChange={(v) => updateProfile({ graduationYear: v })} />
                  <div className="space-y-2">
                    <Label htmlFor="profile-province">Province</Label>
                    <Select value={profile.province} onValueChange={(v) => updateProfile({ province: v })}>
                      <SelectTrigger id="profile-province">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PROVINCES.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="about">About you</Label>
                    <Textarea
                      id="about"
                      rows={4}
                      value={profile.about}
                      onChange={(e) => updateProfile({ about: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="skill">Skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((s) => (
                        <Badge key={s} variant="secondary" className="gap-1">
                          {s}
                          <button
                            aria-label={`Remove skill ${s}`}
                            onClick={() => updateProfile({ skills: profile.skills.filter((x) => x !== s) })}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <form
                      className="flex gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const v = skillDraft.trim();
                        if (!v) return;
                        updateProfile({ skills: [...profile.skills, v] });
                        setSkillDraft("");
                      }}
                    >
                      <Input
                        id="skill"
                        value={skillDraft}
                        onChange={(e) => setSkillDraft(e.target.value)}
                        placeholder="Add a skill, e.g. Excel"
                      />
                      <Button type="submit" variant="outline">
                        Add
                      </Button>
                    </form>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3 sm:col-span-2">
                    <Label htmlFor="relocate" className="font-normal">
                      Open to relocating for the right opportunity
                    </Label>
                    <Switch
                      id="relocate"
                      checked={profile.openToRelocate}
                      onCheckedChange={(v) => updateProfile({ openToRelocate: v })}
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-3 sm:col-span-2">
                    <Label htmlFor="licence" className="font-normal">
                      I have a valid code B driver's licence
                    </Label>
                    <Switch
                      id="licence"
                      checked={profile.driversLicence}
                      onCheckedChange={(v) => updateProfile({ driversLicence: v })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="text-base">Profile strength</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={completeness} aria-label={`Profile ${completeness} percent complete`} />
                  <p className="text-sm text-muted-foreground">{completeness}% complete</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>{profile.hasCv ? "✅ CV uploaded" : "⬜ Upload your CV"}</li>
                    <li>{profile.driversLicence ? "✅ Driver's licence" : "⬜ Add a driver's licence if you have one"}</li>
                    <li>{profile.skills.length >= 5 ? "✅ Five or more skills" : "⬜ Add at least 5 skills"}</li>
                  </ul>
                  <AiDisclaimer />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cv" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your CV</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.hasCv ? (
                    <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                      <FileText className="size-8 text-primary" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{profile.cvName}</p>
                        <p className="text-xs text-muted-foreground">Uploaded · used for AI matching</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto"
                        onClick={() => updateProfile({ hasCv: false, cvName: "" })}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border p-8 text-center">
                      <Upload className="size-8 text-muted-foreground" aria-hidden="true" />
                      <p className="text-sm font-medium">No CV on file</p>
                      <p className="max-w-xs text-sm text-muted-foreground">
                        Add a CV so the AI can compare it to each advert. PDF or Word, under 5 MB.
                      </p>
                      <Button
                        onClick={() => {
                          updateProfile({ hasCv: true, cvName: "My_CV_2026.pdf" });
                          toast.success("Demo CV attached");
                        }}
                      >
                        Upload a CV (demo)
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="size-5 text-accent" aria-hidden="true" /> AI CV review
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {profile.hasCv ? (
                    <>
                      <p className="font-medium">Three things to fix first:</p>
                      <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
                        <li>
                          Your summary describes what you studied, not what you want. Replace it with: "Graduate
                          software developer seeking a graduate programme in Gauteng or remote."
                        </li>
                        <li>
                          Two of your bullet points have no result. Add a number: users, hours saved, marks, or people
                          helped.
                        </li>
                        <li>
                          Add a short "Projects" section — it is the strongest evidence when you have limited formal
                          experience.
                        </li>
                      </ol>
                      <AiDisclaimer />
                    </>
                  ) : (
                    <p className="text-muted-foreground">
                      Upload a CV and the review will appear here with specific, line-level suggestions.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <OpportunityDetail opportunity={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function EmptyState({ title, body, cta }: { title: string; body: string; cta: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-secondary text-primary">
          <LayoutGrid className="size-6" aria-hidden="true" />
        </span>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="max-w-sm text-sm text-muted-foreground">{body}</p>
        {cta}
      </CardContent>
    </Card>
  );
}
