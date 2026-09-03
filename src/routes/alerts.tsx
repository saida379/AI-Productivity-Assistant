import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BellRing, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PROVINCES } from "@/data/opportunities";
import { useAppStore, type AlertRule } from "@/lib/app-store";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Opportunity alerts | GradLink AI" },
      {
        name: "description",
        content: "Get notified by WhatsApp, email or in-app when new South African opportunities match your interests.",
      },
      { property: "og:title", content: "Opportunity alerts | GradLink AI" },
      { property: "og:description", content: "Set keyword and province alerts so you never miss a closing date." },
    ],
  }),
  component: Alerts,
});

function Alerts() {
  const { alerts, addAlert, toggleAlert, removeAlert } = useAppStore();
  const [keyword, setKeyword] = React.useState("");
  const [province, setProvince] = React.useState("All provinces");
  const [frequency, setFrequency] = React.useState<AlertRule["frequency"]>("Daily");
  const [channel, setChannel] = React.useState<AlertRule["channel"]>("WhatsApp");

  return (
    <div>
      <PageHeader
        eyebrow="Alerts"
        title="Never miss a closing date"
        description="Most opportunities are lost to deadlines, not to competition. Set an alert and we tell you the day something matching goes live."
      />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[360px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-base">Create an alert</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!keyword.trim()) return;
                addAlert({ keyword: keyword.trim(), province, frequency, channel, active: true });
                setKeyword("");
                toast.success("Alert created");
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="keyword">Keyword</Label>
                <Input
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. learnership, data, nursing"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alert-province">Province</Label>
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger id="alert-province">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All provinces">All provinces</SelectItem>
                    {PROVINCES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={frequency} onValueChange={(v) => setFrequency(v as AlertRule["frequency"])}>
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Instant", "Daily", "Weekly"].map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel">Send via</Label>
                <Select value={channel} onValueChange={(v) => setChannel(v as AlertRule["channel"])}>
                  <SelectTrigger id="channel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["WhatsApp", "Email", "In-app"].map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Create alert
              </Button>
              <p className="text-xs text-muted-foreground">
                Low-data by design: WhatsApp alerts are plain text and under 1 KB.
              </p>
            </form>
          </CardContent>
        </Card>

        <section aria-label="Your alerts" className="space-y-4">
          {alerts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                <span className="grid size-14 place-items-center rounded-full bg-secondary text-primary">
                  <BellRing className="size-6" aria-hidden="true" />
                </span>
                <h2 className="text-lg font-semibold">No alerts yet</h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Create your first alert on the left — most students set one for their field and one for their
                  province.
                </p>
              </CardContent>
            </Card>
          ) : (
            alerts.map((a) => (
              <Card key={a.id}>
                <CardContent className="flex flex-wrap items-center gap-4 pt-6">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">“{a.keyword}”</p>
                    <p className="text-sm text-muted-foreground">
                      {a.province} · {a.frequency} · {a.channel}
                    </p>
                  </div>
                  <Badge variant={a.active ? "secondary" : "outline"}>{a.active ? "Active" : "Paused"}</Badge>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`toggle-${a.id}`} className="sr-only">
                      Toggle alert for {a.keyword}
                    </Label>
                    <Switch id={`toggle-${a.id}`} checked={a.active} onCheckedChange={() => toggleAlert(a.id)} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="min-h-11 min-w-11"
                      aria-label={`Delete alert for ${a.keyword}`}
                      onClick={() => removeAlert(a.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
