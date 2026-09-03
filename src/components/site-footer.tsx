import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-muted/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-lg font-bold">
            GradLink <span className="text-accent">AI</span>
          </p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            A South African career and opportunity platform for students, graduates and unemployed young people.
            GradLink AI helps you find, understand and apply for opportunities — it does not guarantee employment,
            placement or funding.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <ShieldCheck className="size-4 text-success" aria-hidden="true" />
            Free for students. No fees, ever.
          </p>
        </div>
        <nav aria-label="Explore" className="text-sm">
          <p className="font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <Link to="/opportunities" className="hover:text-foreground">
                Opportunity Hub
              </Link>
            </li>
            <li>
              <Link to="/wil-connect" className="hover:text-foreground">
                WIL Connect
              </Link>
            </li>
            <li>
              <Link to="/academy" className="hover:text-foreground">
                Career Launch Academy
              </Link>
            </li>
            <li>
              <Link to="/interview-coach" className="hover:text-foreground">
                Interview Coach
              </Link>
            </li>
            <li>
              <Link to="/alerts" className="hover:text-foreground">
                Opportunity alerts
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Company" className="text-sm">
          <p className="font-semibold">Platform</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                Mission, vision & impact
              </Link>
            </li>
            <li>
              <Link to="/trust-safety" className="hover:text-foreground">
                Trust & safety
              </Link>
            </li>
            <li>
              <Link to="/employers" className="hover:text-foreground">
                Employer portal
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-foreground">
                My dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          Demo product. All opportunities, employers and AI responses shown here are illustrative examples for
          demonstration purposes. AI guidance can be wrong — always verify closing dates and requirements with the
          official source before applying. © {new Date().getFullYear()} GradLink AI.
        </p>
      </div>
    </footer>
  );
}
