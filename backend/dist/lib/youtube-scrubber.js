const YouTubeSpec = {
    channelsWhitelist: [
        "ESPN",
        "NBA",
        "NFL",
        "TheAthletic",
        "PFF",
        "Underdog Fantasy",
        "Bleacher Report",
    ],
    requiredKeywords: [
        "injury",
        "out",
        "questionable",
        "starting",
        "inactive",
        "ruled out",
        "lineup",
    ],
    bannedKeywords: [
        "parlay",
        "lock",
        "guaranteed",
        "sure win",
        "bet of the day",
    ],
    maxVideoAgeHours: 24,
    minViews: 3000,
    momentumBoost: 0.05,
};
function normalizeText(value) {
    return value.trim().toLowerCase();
}
function dedupeClips(clips) {
    const unique = new Map();
    for (const clip of clips) {
        if (!unique.has(clip.videoId)) {
            unique.set(clip.videoId, clip);
        }
    }
    return [...unique.values()];
}
async function fetchVideoStats(videoIds, apiKey, fetchImpl) {
    if (!videoIds.length) {
        return new Map();
    }
    const url = "https://www.googleapis.com/youtube/v3/videos?part=statistics" +
        `&id=${encodeURIComponent(videoIds.join(","))}` +
        `&key=${encodeURIComponent(apiKey)}`;
    const response = await fetchImpl(url);
    if (!response.ok) {
        throw new Error("YouTube API error");
    }
    const data = await response.json();
    return new Map((data.items ?? []).flatMap((item) => {
        if (!item.id) {
            return [];
        }
        const viewCount = Number(item.statistics?.viewCount ?? 0);
        return [[item.id, Number.isFinite(viewCount) ? viewCount : 0]];
    }));
}
export async function fetchYouTubeClips(teamName, apiKey, fetchImpl = fetch) {
    if (!apiKey.trim()) {
        return [];
    }
    const q = encodeURIComponent(`${teamName} injury news`);
    const url = "https://www.googleapis.com/youtube/v3/search?part=snippet" +
        `&q=${q}&type=video&order=date&maxResults=25&key=${encodeURIComponent(apiKey)}`;
    const response = await fetchImpl(url);
    if (!response.ok) {
        throw new Error("YouTube API error");
    }
    const data = await response.json();
    const baseClips = (data.items ?? []).flatMap((item) => {
        const videoId = item.id?.videoId;
        const title = item.snippet?.title;
        const channelTitle = item.snippet?.channelTitle;
        const publishedAt = item.snippet?.publishedAt;
        if (!videoId || !title || !channelTitle || !publishedAt) {
            return [];
        }
        return [{
                videoId,
                title,
                channelTitle,
                publishedAt,
                viewCount: 0,
                url: `https://www.youtube.com/watch?v=${videoId}`,
            }];
    });
    const statsByVideoId = await fetchVideoStats(baseClips.map((clip) => clip.videoId), apiKey, fetchImpl);
    const now = Date.now();
    return baseClips
        .map((clip) => ({
        ...clip,
        viewCount: statsByVideoId.get(clip.videoId) ?? 0,
    }))
        .filter((clip) => {
        const channelOk = YouTubeSpec.channelsWhitelist.some((channel) => normalizeText(channel) === normalizeText(clip.channelTitle));
        if (!channelOk) {
            return false;
        }
        const title = normalizeText(clip.title);
        const hasRequired = YouTubeSpec.requiredKeywords.some((keyword) => title.includes(keyword));
        if (!hasRequired) {
            return false;
        }
        const hasBanned = YouTubeSpec.bannedKeywords.some((keyword) => title.includes(keyword));
        if (hasBanned) {
            return false;
        }
        const ageHours = (now - new Date(clip.publishedAt).getTime()) / (1000 * 60 * 60);
        if (ageHours > YouTubeSpec.maxVideoAgeHours) {
            return false;
        }
        return clip.viewCount >= YouTubeSpec.minViews;
    })
        .sort((left, right) => {
        const publishedDelta = new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
        if (publishedDelta !== 0) {
            return publishedDelta;
        }
        return right.viewCount - left.viewCount;
    });
}
export async function collectYouTubeSignal(teamNames, apiKey, fetchImpl = fetch) {
    const clipLists = await Promise.all(teamNames.map((teamName) => fetchYouTubeClips(teamName, apiKey, fetchImpl)));
    const clips = dedupeClips(clipLists.flat()).slice(0, 3);
    const hasFreshNews = clips.length > 0;
    return {
        clips,
        boost: hasFreshNews ? YouTubeSpec.momentumBoost : 0,
        hasFreshNews,
    };
}
export async function applyYouTubeSignal(teamName, base, apiKey, fetchImpl = fetch) {
    const signal = await collectYouTubeSignal([teamName], apiKey, fetchImpl);
    return {
        ...base,
        momentum: Math.min(1, base.momentum + signal.boost),
    };
}
