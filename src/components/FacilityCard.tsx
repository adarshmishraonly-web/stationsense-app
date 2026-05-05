import { Link } from "@tanstack/react-router";
import { Navigation, MapPin, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FACILITY_META,
  availabilityLevel,
  availabilityRatio,
  type Facility,
} from "@/lib/stations";

const LEVEL_STYLES: Record<string, { text: string; bar: string; label: string }> = {
  high:    { text: "text-emerald-600", bar: "bg-emerald-500",  label: "High availability" },
  medium:  { text: "text-amber-600",   bar: "bg-amber-500",    label: "Medium availability" },
  low:     { text: "text-red-600",     bar: "bg-red-500",      label: "Low availability" },
  unknown: { text: "text-muted-foreground", bar: "bg-muted-foreground", label: "Availability unknown" },
};

export function FacilityCard({ facility, stationId }: { facility: Facility; stationId: string }) {
  const meta = FACILITY_META[facility.type];
  const ratio = availabilityRatio(facility);
  const level = availabilityLevel(ratio);
  const styles = LEVEL_STYLES[level];
  const pct = ratio === null ? 0 : Math.round(ratio * 100);

  return (
    <div className="group rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
            {meta.label}
          </div>
          <h3 className="text-lg font-semibold">{facility.name}</h3>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Availability</span>
          {ratio === null ? (
            <span className="font-medium text-muted-foreground">Availability unknown</span>
          ) : (
            <span className={`font-medium ${styles.text}`}>
              <strong className="font-bold">{facility.availableUnits}</strong>
              <span className="mx-1 text-muted-foreground">/</span>
              <strong className="font-bold">{facility.totalCapacity}</strong>
              <span className="ml-1 text-muted-foreground">{facility.unitLabel}</span>
            </span>
          )}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all ${styles.bar}`}
            style={{ width: `${pct}%` }}
            aria-label={styles.label}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1 text-muted-foreground"><IndianRupee className="h-3.5 w-3.5" />Price</span>
          <span className="font-medium">{facility.price}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />Distance</span>
          <span className="font-medium">{facility.distance}</span>
        </div>
      </div>

      <Link to="/station/$stationId/map" params={{ stationId }} search={{ facility: facility.id }} className="mt-5 block">
        <Button className="w-full gap-2">
          <Navigation className="h-4 w-4" /> Navigate
        </Button>
      </Link>
    </div>
  );
}
