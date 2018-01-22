require("babel-polyfill");
const dryboard = require("../lib/dryboard");

describe("Tests for the async cache engine", () => {
  it("should have a configuration funcion", () => {
    expect(dryboard.configureDryboard).toBeDefined();
  });
  it("configuration funcion should return the cache object", () => {
    const cache = dryboard.configureDryboard();
    expect(cache.get && cache.set).toBeDefined();
  });
  it("cache should return the default value if key is undefined or null", async () => {
    const keys = []; // no keys
    const cache = dryboard.configureDryboard();
    const nonExistingKey = keys[2];
    expect(await cache.get(nonExistingKey, "DEFAULT_VALUE")).toBe(
      "DEFAULT_VALUE"
    );
  });
  it("cache should retrieve values from original repo", async () => {
    const repo = {
      preExistingValue: 42
    };
    const cache = dryboard.configureDryboard(repo);
    expect(await cache.get("preExistingValue")).toBe(42);
  });
  it("cache should retrieve values set before", async () => {
    const repo = {
      preExistingValue: 42
    };
    const cache = dryboard.configureDryboard(repo);
    expect(await cache.get("preExistingValue")).toBe(42);
    cache.set("newValue", 1001001);
    expect(await cache.get("newValue")).toBe(1001001);
  });
  it("cache should wait to retrieve values set after its call", done => {
    const cache = dryboard.configureDryboard();
    setTimeout(
      async () =>
        expect(await cache.get("delayedValue")).toBe("THERE YOU GO") || done(),
      10
    );
    setTimeout(() => cache.set("delayedValue", "THERE YOU GO"), 1000);
  });
});
