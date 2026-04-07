"use client";

import { useEffect, useState } from "react";
import { RunningBullMark } from "@/components/running-bull-mark";

const INTRO_STORAGE_KEY = "eljefe-home-intro-seen";
const INTRO_DURATION_MS = 3000;

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
        <div aria-hidden="true" className="cinema-intro">
            <div className="cinema-intro-inner">
                <div className="cinema-intro-bull">
                    <RunningBullMark className="cinema-intro-mark" />
                </div>
                <div className="cinema-intro-text">When the bull charges...</div>
                <div className="cinema-intro-flash" />
            </div>
        </div>
    );
}