import * as utils from '@/utils/index';
// @ponicode
describe('utils.numberToCurrency', () => {
  test('convert 1', () => {
    const result = utils.numberToCurrency(1, 'es-CO', 'COP');
    expect(result).toBe('$ 1,00');
  });

  test('convert negative', () => {
    const result = utils.numberToCurrency(-100, 'es-CO', 'COP');
    expect(result).toBe('-$ 100,00');
  });

  test('convert 100', () => {
    const result = utils.numberToCurrency(100, 'es-CO', 'COP');
    expect(result).toBe('$ 100,00');
  });

  test('convert decimal', () => {
    const result = utils.numberToCurrency(-5.48, 'es-CO', 'COP');
    expect(result).toBe('-$ 5,48');
  });
});
