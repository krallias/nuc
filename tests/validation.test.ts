import { beforeEach, describe, expect, it } from "vitest";
import { validateCountry, validatePublicRelease } from "@/lib/validation";
import { isTopLayer, pushLayer, removeLayer, resetLayers } from "@/lib/layers";
import type { CountryRecord, DomainScore } from "@/lib/records";

const src = new Set(["S1"]);
const ok = (score: number | null): DomainScore => ({
  score, status: score === null ? "No Score" : "Normal", evidenceType: "fixture", coverage: "test", sourceIds: score === null ? [] : ["S1"],
});
const rec = (e: DomainScore, r = ok(60), m = ok(90)): CountryRecord => ({
  id: "FIXTURE-A", name: "Fixture A", developmentFixture: true, scores: { energy: e, research: r, military: m },
});

describe("validateCountry", () => {
  it("accepts verified 0, null, and normal scores", () => {
    expect(validateCountry(rec(ok(0)), src)).toEqual([]);
    expect(validateCountry(rec(ok(null)), src)).toEqual([]);
  });
  it("rejects out-of-range", () => expect(validateCountry(rec(ok(101)), src).length).toBeGreaterThan(0));
  it("rejects null score with Normal status", () =>
    expect(validateCountry(rec({ ...ok(null), status: "Normal" }), src).join()).toMatch(/null but status is Normal/));
  it("rejects available score with No Score status", () =>
    expect(validateCountry(rec({ ...ok(30), status: "No Score" }), src).join()).toMatch(/available but status is No Score/));
  it("rejects broken and missing source IDs", () => {
    expect(validateCountry(rec({ ...ok(30), sourceIds: ["NOPE"] }), src).join()).toMatch(/broken source ID/);
    expect(validateCountry(rec({ ...ok(30), sourceIds: [] }), src).join()).toMatch(/no source IDs/);
  });
  it("keeps evidenceType and coverage separate and required", () => {
    expect(validateCountry(rec({ ...ok(30), evidenceType: "" }), src).join()).toMatch(/evidenceType/);
    expect(validateCountry(rec({ ...ok(30), coverage: " " }), src).join()).toMatch(/coverage/);
  });
});

describe("validatePublicRelease", () => {
  it("rejects fixtures", () => expect(validatePublicRelease([rec(ok(0))])).toHaveLength(1));
  it("accepts non-fixtures", () => expect(validatePublicRelease([{ ...rec(ok(0)), developmentFixture: false }])).toEqual([]));
});

describe("layer stack", () => {
  beforeEach(resetLayers);
  it("only the top layer is top", () => {
    pushLayer("a"); pushLayer("b");
    expect(isTopLayer("a")).toBe(false);
    expect(isTopLayer("b")).toBe(true);
    removeLayer("b");
    expect(isTopLayer("a")).toBe(true);
  });
});
