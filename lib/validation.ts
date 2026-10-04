// DEV-05/08 semantic validation. Returns error strings (empty = valid); never silently fixes data.
import { DOMAINS, type CountryRecord } from "./records";

export function validateCountry(c: CountryRecord, knownSourceIds: ReadonlySet<string>): string[] {
  const errors: string[] = [];
  const at = (d: string, msg: string) => errors.push(`${c.id}.${d}: ${msg}`);
  for (const d of DOMAINS) {
    const s = c.scores[d];
    if (!s) { at(d, "missing domain"); continue; }
    const { score } = s;
    if (score !== null && (typeof score !== "number" || !Number.isFinite(score) || score < 0 || score > 100)) {
      at(d, `score out of range: ${String(score)}`);
    }
    if (score === null && s.status === "Normal") at(d, "score is null but status is Normal");
    if (score !== null && s.status === "No Score") at(d, "score is available but status is No Score");
    if (!s.evidenceType?.trim()) at(d, "evidenceType is empty");
    if (!s.coverage?.trim()) at(d, "coverage is empty");
    if (score !== null && s.sourceIds.length === 0) at(d, "available score has no source IDs");
    for (const id of s.sourceIds) if (!knownSourceIds.has(id)) at(d, `broken source ID: ${id}`);
  }
  return errors;
}

/** Public factual build must not contain fixtures. */
export function validatePublicRelease(records: readonly CountryRecord[]): string[] {
  return records.filter((r) => r.developmentFixture).map((r) => `${r.id}: developmentFixture=true in public build`);
}
