/**
 * A valid `JSON` value that is not an object or array.
 */
export type JSONPrimitive = null | boolean | number | string;

/**
 * A valid `JSON` value.
 */
export type JSONValue = JSONPrimitive | JSONArray | JSONObject;

/**
 * A valid `JSON` array value which can be any array of valid `JSON` values.
 */
export interface JSONArray extends Array<JSONValue> {}

/**
 * A valid `JSON` object value which represents an empty or non empty object with `string` keys
 * and values that are valid `JSON` values.
 */
export interface JSONObject<T = JSONValue | undefined> {
  [_: string]: T;
}

/**
 * A branded `JSONString` type indicating that the shape of the stringified `JSON`
 * was previously known and can be re-created without validation.
 */
export interface JSONString<T = JSONValue> extends String {
  __kind: T;
}
