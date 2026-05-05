import { Link, useNavigate } from "@tanstack/react-router";
import { Train, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { clearSession, getSession, type Session } from "@/lib/session";
import { Button } from "@/components/ui/button";

export function Header() {
  const [session, setSessionState] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => { setSessionState(getSession()); }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <Train className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">StationSense</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link to="/" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }}>Home</Link>
          <Link to="/safety" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }}>Safety</Link>
          <Link to="/feedback" className="text-muted-foreground hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }}>Feedback</Link>
        </nav>
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:inline">Hi, {session.name.split(" ")[0]}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { clearSession(); setSessionState(null); navigate({ to: "/login" }); }}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
