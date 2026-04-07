"use client";

import { useEffect, useState } from "react";
import { BullMark } from "@/components/bull-mark";

const INTRO_STORAGE_KEY = "eljefe-home-intro-seen";
const INTRO_DURATION_MS = 3400;

export function HomeIntro() {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const hasSeenIntro = window.localStorage.getItem(INTRO_STORAGE_KEY) === "1";

        if (prefersReducedMotion || hasSeenIntro) {
            return;
        }

        setShouldRender(true);
        window.localStorage.setItem(INTRO_STORAGE_KEY, "1");

        const timeoutId = window.setTimeout(() => {
            setShouldRender(false);
        }, INTRO_DURATION_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, []);

    if (!shouldRender) {
        return null;
    }

    return (
        <div aria-hidden="true" className="intro-overlay">
            <div className="intro-stage">
                <div className="intro-bull-track intro-bull-charge-track">
                    <BullMark className="intro-bull-mark intro-bull-silhouette" />
                </div>
                <div className="intro-charge-shell">
                    <div className="intro-charge-bar" />
                </div>
                <div className="intro-wordmark">
                    <p className="intro-kicker">Lead the heard, beat the book</p>
                    <h1>El Jefe</h1>
                </div>
                <div className="intro-flash" />
            </div>
        </div>
    );
}