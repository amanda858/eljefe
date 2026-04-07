export function americanToImpliedProbability(odds: number) {
    if (odds > 0) {
        return 100 / (odds + 100);
    }

    return Math.abs(odds) / (Math.abs(odds) + 100);
}

export function formatPercent(probability: number) {
    return `${(probability * 100).toFixed(1)}%`;
}

export function bestPriceComparator(a: number, b: number) {
    return b - a;
}

export function average(values: number[]) {
    if (!values.length) {
        return 0;
    }

    return values.reduce((sum, value) => sum + value, 0) / values.length;
}