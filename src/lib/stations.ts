export type FacilityType = "lounge" | "locker" | "washroom" | "seating";

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  totalCapacity: number;
  availableUnits: number;
  unitLabel: string;
  price: string;
  distance: string;
  lat: number;
  lng: number;
}

export interface Station {
  id: string;
  name: string;
  code: string;
  city: string;
  crowd: "Low" | "Moderate" | "High";
  lat: number;
  lng: number;
  facilities: Facility[];
}

export const STATIONS: Station[] = [
  {
    id: "ndls",
    name: "New Delhi Railway Station",
    code: "NDLS",
    city: "New Delhi",
    crowd: "High",
    lat: 28.6426,
    lng: 77.2197,
    facilities: [
      { id: "ndls-lounge", name: "Executive Lounge", type: "lounge", totalCapacity: 20, availableUnits: 8, unitLabel: "seats", price: "₹150/hr", distance: "80 m", lat: 28.6432, lng: 77.2202 },
      { id: "ndls-locker", name: "Cloak Room", type: "locker", totalCapacity: 30, availableUnits: 12, unitLabel: "lockers", price: "₹30/bag", distance: "50 m", lat: 28.6422, lng: 77.2192 },
      { id: "ndls-wash", name: "Pay & Use Washroom", type: "washroom", totalCapacity: 8, availableUnits: 6, unitLabel: "usable", price: "₹10", distance: "30 m", lat: 28.6428, lng: 77.2190 },
      { id: "ndls-seat", name: "Waiting Hall", type: "seating", totalCapacity: 100, availableUnits: 12, unitLabel: "seats", price: "Free", distance: "60 m", lat: 28.6420, lng: 77.2204 },
    ],
  },
  {
    id: "cstm",
    name: "Mumbai CST",
    code: "CSTM",
    city: "Mumbai",
    crowd: "Moderate",
    lat: 18.9402,
    lng: 72.8356,
    facilities: [
      { id: "cstm-lounge", name: "AC Lounge", type: "lounge", totalCapacity: 25, availableUnits: 15, unitLabel: "seats", price: "₹120/hr", distance: "100 m", lat: 18.9408, lng: 72.8362 },
      { id: "cstm-locker", name: "Luggage Lockers", type: "locker", totalCapacity: 40, availableUnits: 22, unitLabel: "lockers", price: "₹40/bag", distance: "70 m", lat: 18.9398, lng: 72.8350 },
      { id: "cstm-wash", name: "Premium Washroom", type: "washroom", totalCapacity: 10, availableUnits: 7, unitLabel: "usable", price: "₹15", distance: "45 m", lat: 18.9404, lng: 72.8348 },
      { id: "cstm-seat", name: "Seating Zone B", type: "seating", totalCapacity: 50, availableUnits: 25, unitLabel: "seats", price: "Free", distance: "55 m", lat: 18.9396, lng: 72.8360 },
    ],
  },
  {
    id: "mas",
    name: "Chennai Central",
    code: "MAS",
    city: "Chennai",
    crowd: "Low",
    lat: 13.0827,
    lng: 80.2750,
    facilities: [
      { id: "mas-lounge", name: "Retiring Lounge", type: "lounge", totalCapacity: 18, availableUnits: 14, unitLabel: "seats", price: "₹100/hr", distance: "90 m", lat: 13.0832, lng: 80.2756 },
      { id: "mas-locker", name: "Cloak Room", type: "locker", totalCapacity: 25, availableUnits: 20, unitLabel: "lockers", price: "₹25/bag", distance: "60 m", lat: 13.0822, lng: 80.2745 },
      { id: "mas-wash", name: "Washroom Block", type: "washroom", totalCapacity: 12, availableUnits: 10, unitLabel: "usable", price: "₹10", distance: "40 m", lat: 13.0828, lng: 80.2746 },
      { id: "mas-seat", name: "Main Seating", type: "seating", totalCapacity: 80, availableUnits: 60, unitLabel: "seats", price: "Free", distance: "50 m", lat: 13.0824, lng: 80.2754 },
    ],
  },
];

export function getStation(id: string) {
  return STATIONS.find((s) => s.id === id);
}

export const FACILITY_META: Record<FacilityType, { label: string; color: string }> = {
  lounge:   { label: "Lounge",   color: "var(--lounge)" },
  locker:   { label: "Locker",   color: "var(--locker)" },
  washroom: { label: "Washroom", color: "var(--washroom)" },
  seating:  { label: "Seating",  color: "var(--seating)" },
};

export function availabilityRatio(f: Pick<Facility, "availableUnits" | "totalCapacity">) {
  if (!f.totalCapacity || f.totalCapacity <= 0) return null;
  return Math.max(0, Math.min(1, f.availableUnits / f.totalCapacity));
}

export function availabilityLevel(ratio: number | null): "high" | "medium" | "low" | "unknown" {
  if (ratio === null) return "unknown";
  if (ratio >= 0.5) return "high";
  if (ratio >= 0.2) return "medium";
  return "low";
}
