import { describe, expect, it } from "vitest";
import { validateConfig, maxImposters, validatePlayerName } from "@/lib/validation/config";
import { BUILT_IN } from "@/data";
import { makePlayers, settings, tinyBank } from "./helpers";

const bank = BUILT_IN.bank;
const codes = (r: ReturnType<typeof validateConfig>) => r.issues.map((i) => i.code);

describe("validateConfig", () => {
  it("accepts a valid default configuration", () => {
    expect(validateConfig(makePlayers(4), settings(), bank).ok).toBe(true);
  });
  it("enforces minimum and maximum player counts", () => {
    expect(codes(validateConfig(makePlayers(2), settings(), bank))).toContain("too-few-players");
    expect(codes(validateConfig(makePlayers(21), settings(), bank))).toContain("too-many-players");
  });
  it("validates imposter count against players", () => {
    expect(maxImposters(3)).toBe(1);
    expect(maxImposters(5)).toBe(2);
    expect(maxImposters(8)).toBe(3);
    expect(codes(validateConfig(makePlayers(4), settings({ imposterCount: 2 }), bank))).toContain("imposters-max");
    expect(codes(validateConfig(makePlayers(4), settings({ imposterCount: 0 }), bank))).toContain("imposters-min");
    expect(validateConfig(makePlayers(5), settings({ imposterCount: 2 }), bank).ok).toBe(true);
  });
  it("rejects blank and duplicate names", () => {
    const ps = [{ id: "1", name: "Sam" }, { id: "2", name: "sam" }, { id: "3", name: " " }];
    const c = codes(validateConfig(ps, settings(), bank));
    expect(c).toContain("duplicate-name");
    expect(c).toContain("blank-name");
    expect(validatePlayerName("SAM", ps.slice(0, 1))).toMatch(/already/);
    expect(validatePlayerName("  ", [])).toMatch(/name/);
  });
  it("requires correct category selections per mode", () => {
    const p = makePlayers(4);
    expect(codes(validateConfig(p, settings({ categoryMode: "single", categoryIds: [] }), bank))).toContain("single-needs-one");
    expect(codes(validateConfig(p, settings({ categoryMode: "single", categoryIds: ["food", "nature"] }), bank))).toContain("single-needs-one");
    expect(codes(validateConfig(p, settings({ categoryMode: "mixed", categoryIds: ["food"] }), bank))).toContain("mixed-needs-two");
    expect(validateConfig(p, settings({ categoryMode: "mixed", categoryIds: ["food", "nature"] }), bank).ok).toBe(true);
    expect(codes(validateConfig(p, settings({ categoryMode: "single", categoryIds: ["nope"] }), bank))).toContain("unknown-category");
  });
  it("explains empty word pools and missing pairs instead of falling back", () => {
    const tiny = tinyBank();
    const r = validateConfig(makePlayers(4), settings({ categoryMode: "single", categoryIds: ["a"], difficulty: "hard" }), tiny);
    expect(codes(r)).toContain("empty-pool");
    expect(r.issues[0].message).toMatch(/another difficulty or category/);
    const r2 = validateConfig(makePlayers(4), settings({ categoryMode: "single", categoryIds: ["b"], difficulty: "hard", wordMode: "different" }), tiny);
    expect(codes(r2)).toContain("no-pairs");
    expect(r2.issues[0].message).toMatch(/related word pairs/);
  });
  it("handles an entirely empty bank", () => {
    const r = validateConfig(makePlayers(4), settings(), { categories: [], words: [], pairs: [] });
    expect(codes(r)).toContain("empty-pool");
  });
});
