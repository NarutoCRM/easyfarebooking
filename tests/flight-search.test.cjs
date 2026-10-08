const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

// Run the real TypeScript utilities with the already-installed compiler.
function loadUtility(name) {
  const filename = path.join(__dirname, "../utils", `${name}.ts`);
  const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, esModuleInterop: true } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, URLSearchParams, require: (id) => id === "@/data/airports.json" ? require("../data/airports.json") : require(id) }, { filename });
  return exports;
}
const { airports, findAirport } = loadUtility("airports");
const { validateFlightSearch, flightSearchParams } = loadUtility("flight-search");
const values = { from: findAirport("DEL"), to: findAirport("JFK"), departure: "2026-11-10", returnDate: "2026-11-20", tripType: "roundtrip", travellers: 2, cabin: "Economy" };

test("dataset provides unique valid IATA codes and retains complete records", () => {
  assert.ok(airports.length > 0);
  assert.equal(new Set(airports.map((airport) => airport.code)).size, airports.length);
  assert.ok(airports.every((airport) => /^[A-Z]{3}$/.test(airport.code)));
  assert.equal(findAirport(" del ").icao, "VIDP");
  assert.equal(findAirport("JFK").city, "New York");
});
test("DEL to JFK is valid; identical airports are rejected", () => {
  assert.equal(validateFlightSearch(values), "");
  assert.match(validateFlightSearch({ ...values, to: values.from }), /cannot be the same/);
});
test("missing and empty airport codes never trigger same-airport error", () => {
  for (const change of [{ from: null }, { to: null }, { from: { code: "" }, to: { code: "" } }]) assert.match(validateFlightSearch({ ...values, ...change }), /Please select departure and destination/);
});
test("dates and traveller counts are validated", () => {
  assert.match(validateFlightSearch({ ...values, departure: "" }), /departure date/);
  assert.match(validateFlightSearch({ ...values, returnDate: "" }), /return date/);
  assert.match(validateFlightSearch({ ...values, returnDate: "2026-11-09" }), /before departure/);
  for (const travellers of [0, -1, 1.5, NaN]) assert.match(validateFlightSearch({ ...values, travellers }), /at least one traveller/);
});
test("round trip URL includes every search field", () => {
  const params = flightSearchParams(values);
  assert.equal(params.get("from"), "DEL");
  assert.equal(params.get("to"), "JFK");
  assert.equal(params.get("departure"), "2026-11-10");
  assert.equal(params.get("return"), "2026-11-20");
  assert.equal(params.get("tripType"), "roundtrip");
  assert.equal(params.get("travellers"), "2");
  assert.equal(params.get("cabin"), "Economy");
});
test("one way ignores return dates and swapping reverses query codes", () => {
  const oneWay = { ...values, tripType: "oneway", returnDate: "" };
  assert.equal(validateFlightSearch(oneWay), "");
  assert.equal(flightSearchParams({ ...oneWay, returnDate: "2026-01-01" }).has("return"), false);
  const swapped = flightSearchParams({ ...values, from: values.to, to: values.from });
  assert.equal(swapped.get("from"), "JFK");
  assert.equal(swapped.get("to"), "DEL");
});
