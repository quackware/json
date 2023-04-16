import { canon } from "../canon.ts";
import { assert, assertEquals, assertExists, assertNotEquals, assertStrictEquals, fc } from "./deps.ts";

Deno.test("canon", async (t) => {
  await t.step("simple check", () => {
    const serialized = canon("[{}]");
    assertExists(serialized);
    const parsed = JSON.parse(serialized);

    const serialized2 = canon(parsed);

    assertStrictEquals(serialized, serialized2);
  });

  await t.step("removes all whitespace padding", () => {
    const parsed = JSON.parse(`
    {
      "key" : "cml",
      "name" : "Curtis",
      "age" : 31
    }
    `);

    const serialized = canon(parsed);

    const whitespaceIndex = serialized.indexOf(" ");
    assertEquals(whitespaceIndex, -1);
  });

  await t.step("does not remove whitespace inside json values", () => {
    const parsed = JSON.parse(`
    {
      "key" : "cml",
      "name" : "Curtis Larson",
      "age" : 31
    }
    `);

    const serialized = canon(parsed);

    const whitespaceIndex = serialized.indexOf(" ");
    assertNotEquals(whitespaceIndex, -1);
  });

  await t.step("json-canon fast check json type", () => {
    fc.assert(
      fc.property(fc.json(), (jsonVal) => {
        const serialized = canon(jsonVal);
        const parsed = JSON.parse(serialized!);
        const serialized2 = canon(parsed);

        assertStrictEquals(serialized, serialized2);
      }),
      { numRuns: 5, verbose: true },
    );
  });

  await t.step("canon export", () => {
    const object = {
      foo: "bar",
      baz: "bing",
    };

    const canoned = canon(object);
    assertExists(canoned);

    const stringToCanon = `{
      "name": "@quackware/json",
      "version": "0.0.1"
    }`;

    const canonedStr = canon(stringToCanon);

    assert(canonedStr != "");
  });
});
