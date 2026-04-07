import assert from "node:assert/strict";
import test from "node:test";
import { applyYouTubeSignal, fetchYouTubeClips } from "../src/lib/youtube-scrubber.js";

function createFetchMock() {
    return async (input: RequestInfo | URL) => {
        const url = String(input);

        if (url.includes("/search?")) {
            return {
                ok: true,
                async json() {
                    return {
                        items: [
                            {
                                id: { videoId: "fresh-good" },
                                snippet: {
                                    title: "Lakers injury update: starter ruled out",
                                    channelTitle: "ESPN",
                                    publishedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
                                },
                            },
                            {
                                id: { videoId: "bad-keyword" },
                                snippet: {
                                    title: "Lakers lock of the day injury talk",
                                    channelTitle: "ESPN",
                                    publishedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
                                },
                            },
                            {
                                id: { videoId: "low-views" },
                                snippet: {
                                    title: "Lakers lineup adjustment after injury report",
                                    channelTitle: "NBA",
                                    publishedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                                },
                            },
                        ],
                    };
                },
            } as Response;
        }

        if (url.includes("/videos?")) {
            return {
                ok: true,
                async json() {
                    return {
                        items: [
                            { id: "fresh-good", statistics: { viewCount: "12000" } },
                            { id: "bad-keyword", statistics: { viewCount: "15000" } },
                            { id: "low-views", statistics: { viewCount: "1200" } },
                        ],
                    };
                },
            } as Response;
        }

        throw new Error(`Unexpected URL ${url}`);
    };
}

test("fetchYouTubeClips keeps only fresh vetted videos with enough views", async () => {
    const clips = await fetchYouTubeClips("Lakers", "fake-key", createFetchMock() as typeof fetch);

    assert.equal(clips.length, 1);
    assert.equal(clips[0]?.videoId, "fresh-good");
    assert.equal(clips[0]?.channelTitle, "ESPN");
    assert.equal(clips[0]?.viewCount, 12000);
});

test("applyYouTubeSignal boosts momentum when vetted news exists", async () => {
    const updated = await applyYouTubeSignal(
        "Lakers",
        {
            market: 0.7,
            momentum: 0.5,
            pattern: 0.6,
            risk: 0.4,
        },
        "fake-key",
        createFetchMock() as typeof fetch,
    );

    assert.equal(updated.market, 0.7);
    assert.equal(updated.pattern, 0.6);
    assert.equal(updated.risk, 0.4);
    assert.equal(updated.momentum, 0.55);
});