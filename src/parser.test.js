import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import parser, { quoteNonSchemeValues, quotedValues } from './parser.js';

describe('quoteNonSchemeValues', () => {
  it('quotes the expected values', () => {
    assert.deepEqual(quotedValues.map(quoteNonSchemeValues), [
      "'none'",
      "'self'",
      "'strict-dynamic'",
      "'report-sample'",
      "'inline-speculation-rules'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "'unsafe-hashes'",
      "'wasm-unsafe-eval'",
    ]);
  });

  it('does not quote unknown values', () => {
    const nonQuotedValues = ['https://www.coolwebsite.com', '*'];
    assert.deepEqual(
      nonQuotedValues.map(quoteNonSchemeValues),
      nonQuotedValues
    );
  });
});

describe('parser', () => {
  it('Returns empty results if no input', () => {
    const input = {};

    assert.equal(parser(input), '');
  });

  it('Returns expected result', () => {
    const input = {
      'default-src': ['self', 'https://foo.com'],
      'script-src': ['unsafe-eval', 'blob:', 'https://www.coolwebsite.com'],
      'img-src': ['data:', '*'],
    };

    assert.equal(
      parser(input),
      `default-src 'self' https://foo.com; script-src 'unsafe-eval' blob: https://www.coolwebsite.com; img-src data: *`
    );
  });
});
