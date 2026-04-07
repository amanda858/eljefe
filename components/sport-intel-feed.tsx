"use client";

import { startTransition, useEffect, useState } from "react";
import type { SportIntelItem } from "@/lib/site-data";

type SportIntelFeedProps = {
    sport: string;
    initialItems: SportIntelItem[];
};

export function SportIntelFeed({ sport, initialItems }: SportIntelFeedProps) {
    const [items, setItems] = useState(initialItems);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);

        fetch(`/api/sports/${sport.toLowerCase()}/intel`, { signal: controller.signal })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to load sport intel");
                }

                return response.json() as Promise<{ items: SportIntelItem[] }>;
            })
            .then((data) => {
                startTransition(() => {
                    setItems(data.items);
                });
            })
            .catch((error) => {
                if (error instanceof Error && error.name === "AbortError") {
                    return;
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            });

        return () => controller.abort();
    }, [sport]);

    return (
        <section className="content-section">
            <div className="card-header">
                <div>
                    <p>Intel feed</p>
                    <span>{sport} live notes</span>
                </div>
                <span>{isLoading ? "Refreshing" : items.length ? "Live intel" : "No live intel"}</span>
            </div>
            {items.length ? (
                <div className="sports-intel-stack">
                    {items.map((item) => (
                        <article className="news-card dark-news-card" key={item.id}>
                            <div className="news-card-header">
                                <p className="card-kicker">{item.tag}</p>
                                <span>{item.time}</span>
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.detail}</p>
                        </article>
                    ))}
                </div>
            ) : (
                <article className="season-empty-state">
                    <p className="card-kicker">No live intel</p>
                    <h3>There is no sport-specific note feed connected yet.</h3>
                    <p className="market-detail-copy">The page now stays honest instead of rendering editorial placeholder notes.</p>
                </article>
            )}
        </section>
    );
}