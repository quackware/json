/**
 * Attempt to serialize the unknown {@linkcode val} to a string
 * in a consistent and reproducable way per the JSON Canonicalization Scheme defined in https://www.rfc-editor.org/rfc/rfc8785
 *
 * @notes This is adapted from the RFC code at https://www.rfc-editor.org/rfc/rfc8785 and converted to TypeScript
 */
export function canon(val: unknown) {
  let buffer = "";
  serialize(val);
  return buffer;

  function serialize(val: unknown) {
    if (val === null || typeof val !== "object" || ("toJSON" in val && val.toJSON != null)) {
      /////////////////////////////////////////////////
      // Primitive type or toJSON, use "JSON"        //
      /////////////////////////////////////////////////
      buffer += JSON.stringify(val);
    } else if (Array.isArray(val)) {
      /////////////////////////////////////////////////
      // Array - Maintain element order              //
      /////////////////////////////////////////////////
      buffer += "[";
      let next = false;
      val.forEach((element) => {
        if (next) {
          buffer += ",";
        }
        next = true;
        /////////////////////////////////////////
        // Array element - Recursive expansion //
        /////////////////////////////////////////
        serialize(element);
      });
      buffer += "]";
    } else {
      /////////////////////////////////////////////////
      // Object - Sort properties before serializing //
      /////////////////////////////////////////////////
      buffer += "{";
      let next = false;
      Object.keys(val)
        .sort()
        .forEach((property) => {
          if (next) {
            buffer += ",";
          }
          next = true;
          /////////////////////////////////////////////
          // Property names are strings, use "JSON"  //
          /////////////////////////////////////////////
          buffer += JSON.stringify(property);
          buffer += ":";
          //////////////////////////////////////////
          // Property value - Recursive expansion //
          //////////////////////////////////////////
          serialize((val as Record<string, unknown>)[property]);
        });
      buffer += "}";
    }
  }
}
