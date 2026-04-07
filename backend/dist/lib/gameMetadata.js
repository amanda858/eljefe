const TEAM_PROFILES = {
    "Boston Celtics": {
        abbr: "BOS",
        record: "58-24",
        recentForm: "8-2 last 10",
        primaryColor: "#007a33",
        secondaryColor: "#ba9653",
    },
    "New York Knicks": {
        abbr: "NYK",
        record: "51-31",
        recentForm: "6-4 last 10",
        primaryColor: "#f58426",
        secondaryColor: "#006bb6",
    },
    "Los Angeles Dodgers": {
        abbr: "LAD",
        record: "96-66",
        recentForm: "7-3 last 10",
        primaryColor: "#005a9c",
        secondaryColor: "#d4e8ff",
    },
    "Atlanta Braves": {
        abbr: "ATL",
        record: "91-71",
        recentForm: "5-5 last 10",
        primaryColor: "#ce1141",
        secondaryColor: "#13274f",
    },
    "Buffalo Bills": {
        abbr: "BUF",
        record: "11-6",
        recentForm: "7-3 last 10",
        primaryColor: "#00338d",
        secondaryColor: "#c60c30",
    },
    "Kansas City Chiefs": {
        abbr: "KC",
        record: "12-5",
        recentForm: "8-2 last 10",
        primaryColor: "#e31837",
        secondaryColor: "#ffb81c",
    },
};
const MLB_WEATHER_BY_VENUE = {
    "Truist Park": {
        temperature: "74 F",
        humidity: "61%",
        wind: "11 mph out to left",
        conditions: "Partly cloudy",
        impact: "Slight boost to carry on fly balls and run environment.",
    },
};
export function getTeamProfile(teamName, fallbackAbbr) {
    return TEAM_PROFILES[teamName] ?? {
        abbr: fallbackAbbr,
        record: "--",
        recentForm: "Form pending",
        primaryColor: "#30343b",
        secondaryColor: "#8d99ae",
    };
}
export function getGameWeather(leagueCode, venue) {
    if (leagueCode !== "MLB") {
        return null;
    }
    return MLB_WEATHER_BY_VENUE[venue] ?? null;
}
