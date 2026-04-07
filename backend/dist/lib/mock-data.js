function makeTodayIso(hoursFromNow) {
    return new Date(Date.now() + hoursFromNow * 60 * 60 * 1000).toISOString();
}
const now = new Date().toISOString();
export const leagues = [
    { id: "league-nba", name: "National Basketball Association", code: "NBA" },
    { id: "league-mlb", name: "Major League Baseball", code: "MLB" },
    { id: "league-nfl", name: "National Football League", code: "NFL" },
];
export const teams = [
    { id: "team-bos", leagueId: "league-nba", name: "Boston Celtics", abbr: "BOS" },
    { id: "team-nyk", leagueId: "league-nba", name: "New York Knicks", abbr: "NYK" },
    { id: "team-lad", leagueId: "league-mlb", name: "Los Angeles Dodgers", abbr: "LAD" },
    { id: "team-atl", leagueId: "league-mlb", name: "Atlanta Braves", abbr: "ATL" },
    { id: "team-buf", leagueId: "league-nfl", name: "Buffalo Bills", abbr: "BUF" },
    { id: "team-kc", leagueId: "league-nfl", name: "Kansas City Chiefs", abbr: "KC" },
];
export const games = [
    {
        id: "game-bos-nyk",
        leagueId: "league-nba",
        homeTeamId: "team-nyk",
        awayTeamId: "team-bos",
        startTime: makeTodayIso(2),
        venue: "Madison Square Garden",
        broadcastNetwork: "ESPN",
    },
    {
        id: "game-lad-atl",
        leagueId: "league-mlb",
        homeTeamId: "team-atl",
        awayTeamId: "team-lad",
        startTime: makeTodayIso(4),
        venue: "Truist Park",
        broadcastNetwork: "FOX",
    },
    {
        id: "game-buf-kc",
        leagueId: "league-nfl",
        homeTeamId: "team-kc",
        awayTeamId: "team-buf",
        startTime: makeTodayIso(7),
        venue: "GEHA Field at Arrowhead Stadium",
        broadcastNetwork: "CBS",
    },
];
export const books = [
    { id: "book-pinnacle", name: "Pinnacle", code: "PIN" },
    { id: "book-fanduel", name: "FanDuel", code: "FD" },
    { id: "book-draftkings", name: "DraftKings", code: "DK" },
];
export const oddsSnapshots = [
    { id: "od1", gameId: "game-bos-nyk", bookId: "book-pinnacle", marketType: "MONEYLINE", selection: "AWAY", price: -148, line: null, createdAt: now },
    { id: "od2", gameId: "game-bos-nyk", bookId: "book-pinnacle", marketType: "MONEYLINE", selection: "HOME", price: 132, line: null, createdAt: now },
    { id: "od3", gameId: "game-bos-nyk", bookId: "book-fanduel", marketType: "MONEYLINE", selection: "AWAY", price: -138, line: null, createdAt: now },
    { id: "od4", gameId: "game-bos-nyk", bookId: "book-fanduel", marketType: "MONEYLINE", selection: "HOME", price: 124, line: null, createdAt: now },
    { id: "od5", gameId: "game-bos-nyk", bookId: "book-draftkings", marketType: "SPREAD", selection: "AWAY", price: -110, line: -4.5, createdAt: now },
    { id: "od6", gameId: "game-bos-nyk", bookId: "book-draftkings", marketType: "SPREAD", selection: "HOME", price: -110, line: 4.5, createdAt: now },
    { id: "od7", gameId: "game-lad-atl", bookId: "book-pinnacle", marketType: "MONEYLINE", selection: "AWAY", price: 118, line: null, createdAt: now },
    { id: "od8", gameId: "game-lad-atl", bookId: "book-pinnacle", marketType: "MONEYLINE", selection: "HOME", price: -128, line: null, createdAt: now },
    { id: "od9", gameId: "game-lad-atl", bookId: "book-fanduel", marketType: "MONEYLINE", selection: "AWAY", price: 126, line: null, createdAt: now },
    { id: "od10", gameId: "game-lad-atl", bookId: "book-fanduel", marketType: "MONEYLINE", selection: "HOME", price: -136, line: null, createdAt: now },
    { id: "od11", gameId: "game-buf-kc", bookId: "book-pinnacle", marketType: "TOTAL", selection: "OVER", price: -108, line: 49.5, createdAt: now },
    { id: "od12", gameId: "game-buf-kc", bookId: "book-pinnacle", marketType: "TOTAL", selection: "UNDER", price: -102, line: 49.5, createdAt: now },
    { id: "od13", gameId: "game-buf-kc", bookId: "book-draftkings", marketType: "TOTAL", selection: "OVER", price: 100, line: 49.5, createdAt: now },
    { id: "od14", gameId: "game-buf-kc", bookId: "book-draftkings", marketType: "TOTAL", selection: "UNDER", price: -120, line: 49.5, createdAt: now },
    { id: "od15", gameId: "game-buf-kc", bookId: "book-fanduel", marketType: "MONEYLINE", selection: "AWAY", price: 114, line: null, createdAt: now },
    { id: "od16", gameId: "game-buf-kc", bookId: "book-fanduel", marketType: "MONEYLINE", selection: "HOME", price: -124, line: null, createdAt: now }
];
