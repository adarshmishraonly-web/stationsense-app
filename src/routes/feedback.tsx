import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star } from "lucide-react";
import { z } from "zod";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { getSession } from "@/lib/session";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/feedback")({
  component: Feedback,
  head: () => ({ meta: [{ title: "Feedback — StationSense" }] }),
});

const schema = z.object({
  message: z.string().trim().min(3, "Tell us a bit more").max(1000),
  rating: z.number().int().min(1).max(5),
});

function Feedback() {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ message, rating });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    try {
      const session = getSession();
      const { error } = await supabase.from("feedback").insert({
        message: parsed.data.message,
        rating: parsed.data.rating,
        user_email: session?.email ?? null,
      });
      if (error) throw error;
      toast.success("Thanks for the feedback!");
      setMessage(""); setRating(5);
    } catch (err: any) {
      toast.error(err?.message ?? "Could not submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Toaster />
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Share your feedback</h1>
        <p className="mt-2 text-muted-foreground">Help us make stations easier to navigate for everyone.</p>

        <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div>
            <label className="mb-2 block text-sm font-medium">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                  <Star
                    className="h-7 w-7 transition"
                    style={{
                      color: n <= rating ? "var(--primary)" : "var(--muted-foreground)",
                      fill: n <= rating ? "var(--primary)" : "transparent",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Message</label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5}
              placeholder="What worked, what didn't?" maxLength={1000} />
          </div>
          <Button type="submit" disabled={loading}>{loading ? "Sending…" : "Send feedback"}</Button>
        </form>
      </main>
    </div>
  );
}
