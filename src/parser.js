const quotedValues = [
  'none',
  'self',
  'strict-dynamic',
  'report-sample',
  'inline-speculation-rules',
  'unsafe-inline',
  'unsafe-eval',
  'unsafe-hashes',
  'wasm-unsafe-eval',
];

/**
 * Adds quotes for non-host or or scheme values
 *
 * WARNING: does not quote nonce or sha values as these would have to
 * be dynamically generated anyway.
 *
 * @param {string} value
 * @returns {string}
 */
const quoteNonSchemeValues = (value) =>
  quotedValues.includes(value) ? `'${value}'` : value;

/**
 * Parses the CSP rules object into a single line http header value format.
 *
 * @param {object} rulesObject  a JS object that represents the CSP policy
 * @returns {string}
 */
const parseRules = (rulesObject) => {
  let results = [];

  for (const [directive, value] of Object.entries(rulesObject)) {
    const valueList = Array.isArray(value) ? value : [value];

    results.push(
      `${directive} ${valueList.map(quoteNonSchemeValues).join(' ')}`
    );
  }

  return results.join('; ');
};

export default parseRules;
