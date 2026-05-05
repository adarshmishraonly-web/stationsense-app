import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, useMap } from "react-leaflet";
import { FACILITY_META, type Station } from "@/lib/stations";

function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => { map.setView([lat, lng], 17); }, [lat, lng, map]);
  return null;
}

export function StationMap({
  station,
  activeFacilityId,
  onSelect,
}: {
  station: Station;
  activeFacilityId?: string;
  onSelect?: (id: string) => void;
}) {
  const active = useMemo(
    () => station.facilities.find((f) => f.id === activeFacilityId),
    [station, activeFacilityId],
  );

  return (
    <MapContainer
      center={[station.lat, station.lng]}
      zoom={17}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", minHeight: 420 }}
    >
      <Recenter lat={station.lat} lng={station.lng} />
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={[station.lat, station.lng]}
        radius={10}
        pathOptions={{ color: "var(--primary)", fillColor: "var(--primary)", fillOpacity: 0.9 }}
      >
        <Popup>{station.name}</Popup>
      </CircleMarker>

      {station.facilities.map((f) => {
        const meta = FACILITY_META[f.type];
        return (
          <CircleMarker
            key={f.id}
            center={[f.lat, f.lng]}
            radius={9}
            pathOptions={{ color: meta.color, fillColor: meta.color, fillOpacity: 0.85, weight: 2 }}
            eventHandlers={{ click: () => onSelect?.(f.id) }}
          >
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">{f.name}</div>
                <div className="text-xs">
                  Availability:{" "}
                  {f.totalCapacity > 0
                    ? `${f.availableUnits} / ${f.totalCapacity} ${f.unitLabel}`
                    : "unknown"}
                </div>
                <div className="text-xs">Price: {f.price}</div>
                <div className="text-xs">Distance: {f.distance}</div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}

      {active && (
        <Polyline
          positions={[[station.lat, station.lng], [active.lat, active.lng]]}
          pathOptions={{ color: "var(--primary)", weight: 4, dashArray: "8 6" }}
        />
      )}
    </MapContainer>
  );
}
