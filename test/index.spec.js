const calc = require('../index');

describe('calc', () => {
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

  test('division by zero', () => {
    expect(() => {
      calc('1 / 0');
    }).toThrow();
  });

  test('mismatch parentheses at the end', () => {
    expect(() => {
      calc('(1 + 2) * 2)');
    }).toThrow();
  });

  test('mismatch parentheses at the beginning', () => {
    expect(() => {
      calc('((1 + 2) * 2');
    }).toThrow();
  });

  test('exponentiation', () => {
    expect(calc('2 ^ (2 + 2)')).toBe(16);
  });
});
