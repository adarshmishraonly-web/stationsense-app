import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Users, ArrowLeft, MapIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { FacilityCard } from "@/components/FacilityCard";
import { Button } from "@/components/ui/button";
import { getStation, type Station } from "@/lib/stations";

export const Route = createFileRoute("/station/$stationId/")({
  component: StationPage,
  loader: ({ params }) => {
    const station = getStation(params.stationId);
    if (!station) throw notFound();
    return { station };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.station.name ?? "Station"} — StationSense` },
      { name: "description", content: `Facilities, availability and prices at ${loaderData?.station.name}.` },
    ],
  }),
});

function StationPage() {
  const { station } = Route.useLoaderData() as { station: Station };
  const crowdColor =
    station.crowd === "Low" ? "var(--seating)" :
    station.crowd === "Moderate" ? "var(--lounge)" : "var(--destructive)";

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" /> All stations
        </Link>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">{station.code}</span>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{station.name}</h1>
            <p className="text-muted-foreground">{station.city}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm">
              <Users className="h-4 w-4" style={{ color: crowdColor }} />
              <span>Crowd: <strong>{station.crowd}</strong></span>
            </div>
            <Link to="/station/$stationId/map" params={{ stationId: station.id }}>
              <Button variant="secondary" className="gap-2"><MapIcon className="h-4 w-4" /> Open map</Button>
            </Link>
          </div>
        </div>

        <h2 className="mt-10 mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Facilities</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {station.facilities.map((f) => (
            <FacilityCard key={f.id} facility={f} stationId={station.id} />
          ))}
        </div>
      </main>
    </div>
  );
}
