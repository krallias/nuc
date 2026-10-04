import { describe, expect, it } from "vitest";
import { MODULES, PILOT_COUNTRIES } from "@/data/registry";
import { LOCALES, isLocale } from "@/lib/i18n";

describe("locked registry", () => {
  it("has exactly M-001..M-012 in order", () => {
    expect(MODULES.map(([id]) => id)).toEqual(
      Array.from({ length: 12 }, (_, i) => `M-${String(i + 1).padStart(3, "0")}`));
  });
  it("has the 8 pilot countries", () => expect(PILOT_COUNTRIES).toHaveLength(8));
});

describe("locales", () => {
  it("accepts el/en only", () => {
    expect(LOCALES).toEqual(["el", "en"]);
    expect(isLocale("el")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });
});
