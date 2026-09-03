import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Menu, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const NAV = [
  { to: "/opportunities", label: "Opportunity Hub" },
  { to: "/wil-connect", label: "WIL Connect" },
  { to: "/coach", label: "AI Coach" },
  { to: "/academy", label: "Academy" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/employers", label: "For employers" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="hero-gradient grid size-9 place-items-center rounded-xl text-primary-foreground">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>
          GradLink <span className="text-accent">AI</span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-secondary-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/opportunities">Find opportunities</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation menu" className="min-h-11 min-w-11 lg:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm">
              <SheetHeader>
                <SheetTitle>Navigate GradLink AI</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-2 flex flex-col gap-1 px-4 pb-6">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted data-[status=active]:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-3">
                  <Link to="/opportunities" onClick={() => setOpen(false)}>
                    Find opportunities
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
