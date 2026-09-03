import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { OpportunityCard } from "@/components/opportunity-card";
import { OpportunityDetail } from "@/components/opportunity-detail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  FIELDS,
  OPPORTUNITY_TYPES,
  PROVINCES,
  opportunities,
  type Opportunity,
  type OpportunityType,
} from "@/data/opportunities";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunity Hub | GradLink AI" },
      {
        name: "description",
        content:
          "Search verified South African learnerships, internships, bursaries, graduate programmes and entry-level jobs with AI match explanations.",
      },
      { property: "og:title", content: "Opportunity Hub | GradLink AI" },
      {
        property: "og:description",
        content: "Filter opportunities by province, type, NQF level and work mode, with AI explanations for every match.",
      },
    ],
  }),
  component: Hub,
});

function Hub() {
  const [query, setQuery] = React.useState("");
  const [province, setProvince] = React.useState("all");
  const [types, setTypes] = React.useState<OpportunityType[]>([]);
  const [field, setField] = React.useState("all");
  const [minMatch, setMinMatch] = React.useState(0);
  const [selected, setSelected] = React.useState<Opportunity | null>(null);
  const [showFilters, setShowFilters] = React.useState(false);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return opportunities
      .filter((o) => {
        const matchesQuery =
          !q ||
          [o.title, o.organisation, o.city, o.summary, ...o.fields].join(" ").toLowerCase().includes(q);
        const matchesProvince = province === "all" || o.province === province;
        const matchesType = types.length === 0 || types.includes(o.type);
        const matchesField = field === "all" || o.fields.includes(field);
        return matchesQuery && matchesProvince && matchesType && matchesField && o.matchScore >= minMatch;
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [query, province, types, field, minMatch]);

  const activeFilters = (province !== "all" ? 1 : 0) + types.length + (field !== "all" ? 1 : 0) + (minMatch > 0 ? 1 : 0);

  const reset = () => {
    setQuery("");
    setProvince("all");
    setTypes([]);
    setField("all");
    setMinMatch(0);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Opportunity Hub"
        title="Find your next opportunity"
        description="Learnerships, internships, bursaries, graduate programmes, entry-level jobs and WIL placements from across South Africa — each with an AI explanation of why it matches you."
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Label htmlFor="opportunity-search" className="sr-only">
              Search opportunities
            </Label>
            <Input
              id="opportunity-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by role, employer, city or field…"
              className="h-12 pl-9"
            />
          </div>
          <Button variant="outline" className="h-12 lg:hidden" onClick={() => setShowFilters((s) => !s)}>
            <SlidersHorizontal className="mr-2 size-4" aria-hidden="true" />
            Filters {activeFilters ? `(${activeFilters})` : ""}
          </Button>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className={`${showFilters ? "block" : "hidden"} lg:block`} aria-label="Filters">
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 font-semibold">
                    <Filter className="size-4" aria-hidden="true" /> Filters
                  </p>
                  {activeFilters ? (
                    <Button variant="ghost" size="sm" onClick={reset}>
                      Clear
                    </Button>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Select value={province} onValueChange={setProvince}>
                    <SelectTrigger id="province">
                      <SelectValue placeholder="All provinces" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All provinces</SelectItem>
                      {PROVINCES.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field">Field of study</Label>
                  <Select value={field} onValueChange={setField}>
                    <SelectTrigger id="field">
                      <SelectValue placeholder="All fields" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All fields</SelectItem>
                      {FIELDS.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <fieldset className="space-y-3">
                  <legend className="text-sm font-medium">Opportunity type</legend>
                  {OPPORTUNITY_TYPES.map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <Checkbox
                        id={`type-${t}`}
                        checked={types.includes(t)}
                        onCheckedChange={(checked) =>
                          setTypes((prev) => (checked ? [...prev, t] : prev.filter((x) => x !== t)))
                        }
                      />
                      <Label htmlFor={`type-${t}`} className="font-normal">
                        {t}
                      </Label>
                    </div>
                  ))}
                </fieldset>

                <div className="space-y-3">
                  <Label htmlFor="match">Minimum AI match: {minMatch}%</Label>
                  <Slider
                    id="match"
                    value={[minMatch]}
                    max={95}
                    step={5}
                    onValueChange={([v]) => setMinMatch(v ?? 0)}
                  />
                </div>
              </CardContent>
            </Card>
          </aside>

          <section aria-label="Results">
            <div className="flex flex-wrap items-center gap-2 pb-4">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {results.length} {results.length === 1 ? "opportunity" : "opportunities"} found
              </p>
              {types.map((t) => (
                <Badge key={t} variant="secondary" className="gap-1">
                  {t}
                  <button
                    onClick={() => setTypes((prev) => prev.filter((x) => x !== t))}
                    aria-label={`Remove ${t} filter`}
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>

            {results.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                  <span className="grid size-14 place-items-center rounded-full bg-secondary text-primary">
                    <Search className="size-6" aria-hidden="true" />
                  </span>
                  <h2 className="text-lg font-semibold">No opportunities match those filters</h2>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Try widening your province, lowering the minimum AI match, or removing a type filter. New demo
                    listings are added weekly.
                  </p>
                  <Button onClick={reset}>Clear all filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((o) => (
                  <OpportunityCard key={o.id} opportunity={o} onOpen={setSelected} />
                ))}
              </div>
            )}

            <AiDisclaimer className="mt-6">
              Match scores are generated from your profile and the listing text. They are an estimate to help you
              prioritise, not a decision by the employer, and a low score does not stop you from applying.
            </AiDisclaimer>
          </section>
        </div>
      </div>

      <OpportunityDetail opportunity={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  );
}
