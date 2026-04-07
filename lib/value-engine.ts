import {
    type ValueBetCard,
    type ValueEngineAccuracySummary,
    type ValueEnginePerformanceSummary,
} from "@/lib/site-data";

export type ValueBetApiResponse = {
    generated_at: string;
    count: number;
    min_edge: number;
    model_version: string;
    bets: Array<{
        game_id: string;
        league: string;
        market: string;
        side: "home" | "away";
        team: string;
        book_id: string;
        book_american_odds: number;
        book_decimal_odds: number;
        our_probability: number;
        book_implied_probability: number;
        book_fair_probability: number;
        edge: number;
        expected_value_per_unit: number;
        confidence: number;
        recommended_stake: {
            stake_size: number;
            bankroll_fraction: number;
            kelly_fraction_used: number;
            max_bet_pct: number;
            max_daily_pct: number;
            risk_flags: string[];
        };
        audit: {
            generated_at: string;
            model_version: string;
            feature_version: string;
            data_version: string;
            quote_timestamp: string;
            book_id: string;
            source: string;
        };
    }>;
};

export type ValueEngineIntegration = {
    bets: ValueBetCard[];
    performance: ValueEnginePerformanceSummary;
    source: "service" | "unavailable";
    modelVersion: string;
    generatedAt: string;
};

export type PerformanceApiResponse = {
    roi_total: number;
    roi_by_league: Record<string, number>;
    hit_rate_by_edge_bucket: Record<string, number>;
    bankroll_curve: number[];
    calibration_by_model: Record<string, number>;
    exposure_by_book: Record<string, number>;
};

export type AccuracyApiResponse = {
    generated_at: string;
    sample_count: number;
    ensemble: {
        model_name: string;
        brier_score: number;
        log_loss: number;
        pick_accuracy: number;
        mean_confidence_gap: number;
    };
    sportsbook_fair_baseline: {
        model_name: string;
        brier_score: number;
        log_loss: number;
        pick_accuracy: number;
        mean_confidence_gap: number;
    };
    models: Array<{
        model_name: string;
        brier_score: number;
        log_loss: number;
        pick_accuracy: number;
        mean_confidence_gap: number;
    }>;
    calibration_buckets: Array<{
        bucket: string;
        mean_predicted: number;
        actual_rate: number;
        count: number;
    }>;
    notes: string[];
};

function getValueEngineUrl() {
    return process.env.VALUE_ENGINE_URL ?? "http://127.0.0.1:8001";
}

function buildOpponentMap(data: ValueBetApiResponse) {
    const teamsByGame = new Map<string, Set<string>>();

    for (const bet of data.bets) {
        const teams = teamsByGame.get(bet.game_id) ?? new Set<string>();
        teams.add(bet.team);
        teamsByGame.set(bet.game_id, teams);
    }

    return teamsByGame;
}

function inferOpponent(gameId: string, team: string, teamsByGame: Map<string, Set<string>>) {
    const liveTeams = teamsByGame.get(gameId);
    if (liveTeams && liveTeams.size > 1) {
        return [...liveTeams].find((item) => item !== team) ?? "Opponent";
    }

    return "Opponent";
}

function getEmptyPerformance(): ValueEnginePerformanceSummary {
    return {
        roiTotal: 0,
        roiByLeague: {},
        hitRateByEdgeBucket: {},
        bankrollCurve: [],
        calibrationByModel: {},
        exposureByBook: {},
    };
}

function getEmptyAccuracy(): ValueEngineAccuracySummary {
    return {
        sampleCount: 0,
        ensemble: {
            modelName: "ensemble",
            brierScore: 0,
            logLoss: 0,
            pickAccuracy: 0,
            meanConfidenceGap: 0,
        },
        sportsbookFairBaseline: {
            modelName: "sportsbook_fair_baseline",
            brierScore: 0,
            logLoss: 0,
            pickAccuracy: 0,
            meanConfidenceGap: 0,
        },
        models: [],
        calibrationBuckets: [],
        notes: [],
    };
}

function normalizePerformance(data: PerformanceApiResponse): ValueEnginePerformanceSummary {
    return {
        roiTotal: data.roi_total,
        roiByLeague: data.roi_by_league,
        hitRateByEdgeBucket: data.hit_rate_by_edge_bucket,
        bankrollCurve: data.bankroll_curve,
        calibrationByModel: data.calibration_by_model,
        exposureByBook: data.exposure_by_book,
    };
}

function normalizeResponse(data: ValueBetApiResponse, performance: ValueEnginePerformanceSummary): ValueEngineIntegration {
    const teamsByGame = buildOpponentMap(data);

    return {
        bets: data.bets.map((bet) => ({
            gameId: bet.game_id,
            league: bet.league,
            side: bet.side,
            team: bet.team,
            opponent: inferOpponent(bet.game_id, bet.team, teamsByGame),
            bookId: bet.book_id,
            market: bet.market,
            bookAmericanOdds: bet.book_american_odds,
            bookDecimalOdds: bet.book_decimal_odds,
            ourProbability: bet.our_probability,
            bookFairProbability: bet.book_fair_probability,
            edge: bet.edge,
            expectedValuePerUnit: bet.expected_value_per_unit,
            confidence: bet.confidence,
            stakeSize: bet.recommended_stake.stake_size,
            bankrollFraction: bet.recommended_stake.bankroll_fraction,
            riskFlags: bet.recommended_stake.risk_flags,
            modelVersion: bet.audit.model_version,
            quoteTimestamp: bet.audit.quote_timestamp,
        })),
        performance,
        source: "service",
        modelVersion: data.model_version,
        generatedAt: data.generated_at,
    };
}

export async function getValueEngineIntegration(minEdge = 0.03): Promise<ValueEngineIntegration> {
    const endpoint = new URL("/value-bets", getValueEngineUrl());
    endpoint.searchParams.set("min_edge", String(minEdge));

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            next: { revalidate: 15 },
            headers: { Accept: "application/json" },
        });

        if (!response.ok) {
            throw new Error(`Value engine responded with ${response.status}`);
        }

        const data = (await response.json()) as ValueBetApiResponse;

        let performance = getEmptyPerformance();
        try {
            const performanceEndpoint = new URL("/metrics/performance", getValueEngineUrl());
            const performanceResponse = await fetch(performanceEndpoint, {
                method: "GET",
                next: { revalidate: 30 },
                headers: { Accept: "application/json" },
            });

            if (!performanceResponse.ok) {
                throw new Error(`Value engine performance responded with ${performanceResponse.status}`);
            }

            performance = normalizePerformance((await performanceResponse.json()) as PerformanceApiResponse);
        } catch {
            performance = getEmptyPerformance();
        }

        return normalizeResponse(data, performance);
    } catch {
        return {
            bets: [],
            performance: getEmptyPerformance(),
            source: "unavailable",
            modelVersion: "unavailable",
            generatedAt: "",
        };
    }
}

export async function getValueEngineAccuracy(): Promise<ValueEngineAccuracySummary> {
    const endpoint = new URL("/metrics/accuracy", getValueEngineUrl());

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            next: { revalidate: 30 },
            headers: { Accept: "application/json" },
        });

        if (!response.ok) {
            throw new Error(`Value engine accuracy responded with ${response.status}`);
        }

        const data = (await response.json()) as AccuracyApiResponse;
        return {
            sampleCount: data.sample_count,
            ensemble: {
                modelName: data.ensemble.model_name,
                brierScore: data.ensemble.brier_score,
                logLoss: data.ensemble.log_loss,
                pickAccuracy: data.ensemble.pick_accuracy,
                meanConfidenceGap: data.ensemble.mean_confidence_gap,
            },
            sportsbookFairBaseline: {
                modelName: data.sportsbook_fair_baseline.model_name,
                brierScore: data.sportsbook_fair_baseline.brier_score,
                logLoss: data.sportsbook_fair_baseline.log_loss,
                pickAccuracy: data.sportsbook_fair_baseline.pick_accuracy,
                meanConfidenceGap: data.sportsbook_fair_baseline.mean_confidence_gap,
            },
            models: data.models.map((item) => ({
                modelName: item.model_name,
                brierScore: item.brier_score,
                logLoss: item.log_loss,
                pickAccuracy: item.pick_accuracy,
                meanConfidenceGap: item.mean_confidence_gap,
            })),
            calibrationBuckets: data.calibration_buckets.map((item) => ({
                bucket: item.bucket,
                meanPredicted: item.mean_predicted,
                actualRate: item.actual_rate,
                count: item.count,
            })),
            notes: data.notes,
        };
    } catch {
        return getEmptyAccuracy();
    }
}