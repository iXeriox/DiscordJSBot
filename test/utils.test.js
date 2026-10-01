const test = require('node:test');
const assert = require('node:assert/strict');
const { formatDuration } = require('../src/Core/utils');

test('formatDuration creates a readable duration', () => {
  assert.equal(formatDuration(90_000), '1m 30s');
  assert.equal(formatDuration(90_061_000), '1d 1h 1m 1s');
});

test('formatDuration handles zero and invalid values', () => {
  assert.equal(formatDuration(0), '0s');
  assert.equal(formatDuration(-1), '0s');
  assert.equal(formatDuration(Number.NaN), '0s');
});
