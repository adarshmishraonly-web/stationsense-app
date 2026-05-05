import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { FACILITY_META, getStation, type Station } from "@/lib/stations";
import { z } from "zod";

const search = z.object({ facility: z.string().optional() });

export const Route = createFileRoute("/station/$stationId/map")({
  validateSearch: (s) => search.parse(s),
  component: MapPage,
  loader: ({ params }) => {
    const station = getStation(params.stationId);
    if (!station) throw notFound();
    return { station };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Map — ${loaderData?.station.name ?? "Station"} — StationSense` }],
  }),
});

function MapPage() {
  const { station } = Route.useLoaderData() as { station: Station };
  const { facility } = Route.useSearch();
  const [active, setActive] = useState<string | undefined>(facility);
  const [MapComp, setMapComp] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => { setActive(facility); }, [facility]);

  // Leaflet is browser-only — load on client.
  useEffect(() => {
    let mounted = true;
    import("@/components/StationMap").then((m) => { if (mounted) setMapComp(() => m.StationMap); });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link to="/station/$stationId" params={{ stationId: station.id }}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to {station.code}
        </Link>

        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{station.name} — Map</h1>
        <p className="text-sm text-muted-foreground">Tap a marker to see details. Use “Navigate” on a facility to draw a path from the station.</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {station.facilities.map((f) => {
            const meta = FACILITY_META[f.type];
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActive(isActive ? undefined : f.id)}
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition"
                style={{
                  borderColor: meta.color,
                  backgroundColor: isActive ? meta.color : "transparent",
                  color: isActive ? "white" : "inherit",
                }}
              >
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: isActive ? "white" : meta.color }} />
                {f.name}
              </button>
            );
          })}
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-border shadow-soft">
          <div className="h-[60vh] w-full bg-muted">
            {MapComp ? (
              <MapComp station={station} activeFacilityId={active} onSelect={setActive} />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading map…</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
