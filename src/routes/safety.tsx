import { createFileRoute } from "@tanstack/react-router";
import { Phone, ShieldAlert, Headset, Cross } from "lucide-react";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/safety")({
  component: Safety,
  head: () => ({ meta: [
    { title: "Safety & Help — StationSense" },
    { name: "description", content: "Emergency contacts and help desk information for railway travellers." },
  ]}),
});

const contacts = [
  { icon: ShieldAlert, label: "Railway Security (RPF)", number: "182" },
  { icon: Cross, label: "Medical Emergency", number: "108" },
  { icon: Phone, label: "Railway Enquiry", number: "139" },
  { icon: Headset, label: "Women Helpline", number: "1091" },
];

function Safety() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Safety & Help</h1>
        <p className="mt-2 text-muted-foreground">Save these numbers — help is one tap away.</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {contacts.map(({ icon: Icon, label, number }) => (
            <a key={label} href={`tel:${number}`}
               className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm text-muted-foreground">{label}</div>
                <div className="text-xl font-semibold">{number}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Help desk at the station</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Most major stations have a 24×7 enquiry counter located on the main concourse near Platform 1.
            Look for the blue “May I Help You” signage. Station Masters' offices handle lost & found,
            wheelchair assistance and complaints.
          </p>
        </div>
      </main>
    </div>
  );
}
