// DEV-08 guards (AI-D13, MAP_METHOD): 0 is a real score, null is "No Score".
export type Score = number | null;

export function assertValidScore(s: Score, label = "score"): void {
  if (s === null) return;
  if (typeof s !== "number" || !Number.isFinite(s) || s < 0 || s > 100) {
    throw new RangeError(`${label} must be null or a number in 0–100, got ${String(s)}`);
  }
}

/** Composite = mean of all three domains, ONLY if all three exist. Never a 2-domain mean. */
export function composite(energy: Score, research: Score, military: Score): Score {
  assertValidScore(energy, "energy");
  assertValidScore(research, "research");
  assertValidScore(military, "military");
  if (energy === null || research === null || military === null) return null; // not truthiness: 0 is valid
  return (energy + research + military) / 3;
}

/** Bands from MAP_METHOD. Rounding policy for non-integers is OPEN (AI-D20): not invented here. */
export function classify(s: Score): string {
  assertValidScore(s);
  if (s === null) return "No Score";
  if (s === 0) return "No verified activity";
  if (s < 20) return "Minimal";
  if (s < 40) return "Limited";
  if (s < 60) return "Moderate";
  if (s < 80) return "High";
  return "Very high";
}
