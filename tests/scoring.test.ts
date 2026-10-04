import { describe, expect, it } from "vitest";
import { classify, composite } from "@/lib/scoring";

describe("composite (dev arithmetic, not real-country data)", () => {
  it("0,0,0 -> 0 (verified zero stays 0)", () => expect(composite(0, 0, 0)).toBe(0));
  it("30,60,90 -> 60", () => expect(composite(30, 60, 90)).toBe(60));
  it("0,60,90 -> 50 (zero participates)", () => expect(composite(0, 60, 90)).toBe(50));
  it("30,null,90 -> null", () => expect(composite(30, null, 90)).toBeNull());
  it("null,null,null -> null, not 0", () => expect(composite(null, null, null)).toBeNull());
  it("rejects out-of-range / NaN", () => {
    expect(() => composite(101, 0, 0)).toThrow(RangeError);
    expect(() => composite(-1, 0, 0)).toThrow(RangeError);
    expect(() => composite(NaN, 0, 0)).toThrow(RangeError);
  });
});

describe("classify", () => {
  it("separates 0 from No Score", () => {
    expect(classify(0)).toBe("No verified activity");
    expect(classify(null)).toBe("No Score");
  });
  it("bands", () => {
    expect(classify(19)).toBe("Minimal");
    expect(classify(20)).toBe("Limited");
    expect(classify(60)).toBe("High");
    expect(classify(80)).toBe("Very high");
  });
});
