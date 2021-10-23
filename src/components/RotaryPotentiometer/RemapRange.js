export function mapRange(low1, high1, low2, high2, value) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}