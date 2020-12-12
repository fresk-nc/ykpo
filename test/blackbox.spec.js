const calc = require('../index');

describe('blackbox', () => {
  test('summation', () => {
    expect(calc('1 + 2')).toBe(3);
  });

  test('subtraction', () => {
    expect(calc('1 - 2')).toBe(-1);
  });

  test('multiplication', () => {
    expect(calc('1 * 2')).toBe(2);
  });

  test('division', () => {
    expect(calc('1 / 2')).toBe(0.5);
  });

  test('order of operations', () => {
    expect(calc('1 + 2 * 2')).toBe(5);
  });

  test('redefining the order of operations', () => {
    expect(calc('(1 + 2) * 2')).toBe(6);
  });
});
