export function americanToImpliedProbability(odds) {
    if (odds > 0) {
        return 100 / (odds + 100);
    }
    return Math.abs(odds) / (Math.abs(odds) + 100);
}
export function formatPercent(probability) {
    return `${(probability * 100).toFixed(1)}%`;
}
export function bestPriceComparator(a, b) {
    return b - a;
}
export function average(values) {
    if (!values.length) {
        return 0;
    }
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}
