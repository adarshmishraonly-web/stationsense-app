import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Map, BadgeCheck, IndianRupee, ShieldCheck, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { STATIONS } from "@/lib/stations";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const matches = useMemo(
    () => STATIONS.filter((s) =>
      s.name.toLowerCase().includes(q.toLowerCase()) ||
      s.code.toLowerCase().includes(q.toLowerCase()) ||
      s.city.toLowerCase().includes(q.toLowerCase())
    ),
    [q],
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-60"
            style={{ background: "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 25%, transparent), transparent)" }}
          />
          <div className="mx-auto max-w-4xl px-4 pt-16 pb-10 text-center sm:pt-24 sm:pb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              StationSense · Railway Facility Awareness
            </span>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              Know Your Station <span className="text-primary">Before You Wait</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              Find lounges, lockers, washrooms and seating with availability, price and distance — on a real interactive map.
            </p>

            <div className="mx-auto mt-8 max-w-xl">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-soft">
                <Search className="ml-2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search station name, code or city…"
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
                <Button
                  onClick={() => matches[0] && navigate({ to: "/station/$stationId", params: { stationId: matches[0].id } })}
                  disabled={!matches.length}
                >
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              {q && (
                <div className="mt-2 overflow-hidden rounded-xl border border-border bg-card text-left">
                  {matches.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-muted-foreground">No stations match.</div>
                  ) : matches.map((s) => (
                    <Link
                      key={s.id}
                      to="/station/$stationId"
                      params={{ stationId: s.id }}
                      className="flex items-center justify-between border-b border-border/60 px-4 py-3 last:border-0 hover:bg-secondary/40"
                    >
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.code} · {s.city}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-12">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">What you get</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Map, title: "Facility Map", desc: "Interactive map with every facility pinned." },
              { icon: BadgeCheck, title: "Availability", desc: "Live status: open, crowded or full." },
              { icon: IndianRupee, title: "Pricing", desc: "Know the cost before you walk over." },
              { icon: ShieldCheck, title: "Safety", desc: "Emergency contacts at your fingertips." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Popular stations</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STATIONS.map((s) => (
              <Link key={s.id} to="/station/$stationId" params={{ stationId: s.id }}
                className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">{s.code}</span>
                  <span className="text-xs text-muted-foreground">{s.crowd} crowd</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.city}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  View facilities <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
