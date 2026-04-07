import Link from "next/link";
import { RunningBullMark } from "@/components/running-bull-mark";

type AppHeaderProps = {
    active?: "home" | "dashboard" | "edges" | "sports" | "status";
};

export function AppHeader({ active }: AppHeaderProps) {
    return (
        <header className="app-header">
            <Link href="/" className="app-header-brand">
                <RunningBullMark className="app-header-logo" />
                <span className="app-header-wordmark">El Jefe</span>
            </Link>
            <nav className="app-header-nav">
                <Link href="/" className={active === "home" ? "app-nav-active" : ""}>
                    Today
                </Link>
                <Link href="/edges" className={active === "edges" ? "app-nav-active" : ""}>
                    Best Edges
                </Link>
                <Link href="/dashboard" className={active === "dashboard" ? "app-nav-active" : ""}>
                    Dashboard
                </Link>
                <Link href="/sports" className={active === "sports" ? "app-nav-active" : ""}>
                    Sports
                </Link>
                <Link href="/status" className={active === "status" ? "app-nav-active" : ""}>
                    Status
                </Link>
            </nav>
        </header>
    );
}
