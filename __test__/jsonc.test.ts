import { parse } from "../jsonc.ts";
import { assert, assertObjectMatch, isRecord } from "./deps.ts";

Deno.test("jsonc", async (t) => {
  await t.step("parse", () => {
    const jsonString = /** jsonc */ `
    {
      // This is a comment thats valid in jsonc
      "foo": "bar"
    }`;

    const parsed = parse(jsonString);
    assert(isRecord(parsed));

    assertObjectMatch(parsed, { "foo": "bar" });
  });
});
