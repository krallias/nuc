// DEV-05 record types. PROVISIONAL: field names follow BACKLOG_AND_ACCEPTANCE.md and the handoff text only.
// Replace/align with 02_data/country-profile.schema.json and source-record.schema.json when available.
import type { Score } from "./scoring";

export const DOMAINS = ["energy", "research", "military"] as const;
export type Domain = (typeof DOMAINS)[number];
export type ScoreStatus = "Normal" | "No Score";

export interface DomainScore {
  score: Score;               // null = No Score, never 0
  status: ScoreStatus;        // separate from evidenceType and coverage
  evidenceType: string;
  coverage: string;
  sourceIds: string[];
}

export interface CountryRecord {
  id: string;
  name: string;
  developmentFixture: boolean; // true => "DEVELOPMENT FIXTURE — NOT REAL COUNTRY DATA"
  scores: Record<Domain, DomainScore>;
}

export interface SourceRecord { id: string }
