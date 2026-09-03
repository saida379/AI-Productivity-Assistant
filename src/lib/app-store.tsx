import * as React from "react";

export type Stage = "saved" | "applied" | "interview" | "offer" | "closed";

export const STAGES: { id: Stage; label: string; hint: string }[] = [
  { id: "saved", label: "Saved", hint: "Shortlisted, not applied yet" },
  { id: "applied", label: "Applied", hint: "Application submitted" },
  { id: "interview", label: "Interview", hint: "Screening or interview stage" },
  { id: "offer", label: "Offer", hint: "Offer or placement received" },
  { id: "closed", label: "Closed", hint: "Unsuccessful or withdrawn" },
];

export type Application = {
  id: string;
  opportunityId: string;
  stage: Stage;
  updated: string;
  note?: string;
};

export type Profile = {
  fullName: string;
  headline: string;
  province: string;
  institution: string;
  qualification: string;
  graduationYear: string;
  skills: string[];
  interests: string[];
  about: string;
  hasCv: boolean;
  cvName: string;
  openToRelocate: boolean;
  driversLicence: boolean;
};

export type AlertRule = {
  id: string;
  keyword: string;
  province: string;
  frequency: "Daily" | "Weekly" | "Instant";
  channel: "Email" | "WhatsApp" | "In-app";
  active: boolean;
};

type Ctx = {
  saved: string[];
  toggleSave: (id: string) => void;
  applications: Application[];
  addApplication: (opportunityId: string) => void;
  moveApplication: (id: string, stage: Stage) => void;
  removeApplication: (id: string) => void;
  profile: Profile;
  updateProfile: (patch: Partial<Profile>) => void;
  alerts: AlertRule[];
  addAlert: (rule: Omit<AlertRule, "id">) => void;
  toggleAlert: (id: string) => void;
  removeAlert: (id: string) => void;
};

const defaultProfile: Profile = {
  fullName: "Naledi Mokoena",
  headline: "BSc Computer Science graduate | Aspiring software engineer",
  province: "Gauteng",
  institution: "University of Johannesburg",
  qualification: "BSc Computer Science (NQF 7)",
  graduationYear: "2025",
  skills: ["React", "Python", "SQL", "Problem solving", "isiZulu & English"],
  interests: ["Information Technology", "Business & Admin"],
  about:
    "Recent graduate looking for a graduate programme or junior developer role in Gauteng or remote. I build small web tools and volunteer as a coding tutor on weekends.",
  hasCv: true,
  cvName: "Naledi_Mokoena_CV_2026.pdf",
  openToRelocate: true,
  driversLicence: false,
};

const AppContext = React.createContext<Ctx | null>(null);

const KEY = "gradlink-state-v1";

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = React.useState<string[]>(["opp-1", "opp-8"]);
  const [applications, setApplications] = React.useState<Application[]>([
    { id: "app-1", opportunityId: "opp-2", stage: "applied", updated: "2026-08-28" },
    { id: "app-2", opportunityId: "opp-10", stage: "interview", updated: "2026-09-01", note: "Tech screen on 8 Sept, 14:00" },
    { id: "app-3", opportunityId: "opp-5", stage: "closed", updated: "2026-08-12", note: "Not shortlisted — asked for feedback" },
  ]);
  const [profile, setProfile] = React.useState<Profile>(defaultProfile);
  const [alerts, setAlerts] = React.useState<AlertRule[]>([
    { id: "al-1", keyword: "graduate programme", province: "Gauteng", frequency: "Daily", channel: "WhatsApp", active: true },
    { id: "al-2", keyword: "data analyst", province: "All provinces", frequency: "Weekly", channel: "Email", active: true },
  ]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.saved) setSaved(parsed.saved);
        if (parsed.applications) setApplications(parsed.applications);
        if (parsed.profile) setProfile({ ...defaultProfile, ...parsed.profile });
        if (parsed.alerts) setAlerts(parsed.alerts);
      }
    } catch {
      /* demo state only */
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ saved, applications, profile, alerts }));
    } catch {
      /* ignore */
    }
  }, [hydrated, saved, applications, profile, alerts]);

  const value: Ctx = {
    saved,
    toggleSave: (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
    applications,
    addApplication: (opportunityId) =>
      setApplications((a) =>
        a.some((x) => x.opportunityId === opportunityId)
          ? a
          : [
              ...a,
              {
                id: `app-${Math.random().toString(36).slice(2, 8)}`,
                opportunityId,
                stage: "applied",
                updated: new Date().toISOString().slice(0, 10),
              },
            ],
      ),
    moveApplication: (id, stage) =>
      setApplications((a) =>
        a.map((x) => (x.id === id ? { ...x, stage, updated: new Date().toISOString().slice(0, 10) } : x)),
      ),
    removeApplication: (id) => setApplications((a) => a.filter((x) => x.id !== id)),
    profile,
    updateProfile: (patch) => setProfile((p) => ({ ...p, ...patch })),
    alerts,
    addAlert: (rule) => setAlerts((a) => [...a, { ...rule, id: `al-${Math.random().toString(36).slice(2, 8)}` }]),
    toggleAlert: (id) => setAlerts((a) => a.map((x) => (x.id === id ? { ...x, active: !x.active } : x))),
    removeAlert: (id) => setAlerts((a) => a.filter((x) => x.id !== id)),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useAppStore must be used inside AppStoreProvider");
  return ctx;
}
