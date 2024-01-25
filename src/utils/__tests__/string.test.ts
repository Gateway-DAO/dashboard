import { limitChars, limitCharsCentered } from '../string';
describe('Utils: String', () => {
  describe('limitChars', () => {
    test('returns the original string if it is shorter than the limit', () => {
      const str = 'Hello, World!';
      const limit = 15;

      const result = limitChars(str, limit);

      expect(result).toBe(str);
    });

    test('returns the truncated string with ellipsis if it is longer than the limit', () => {
      const str = 'This is a long string that exceeds the limit';
      const limit = 20;

      const result = limitChars(str, limit);

      expect(result).toBe('This is a long strin...');
    });

    test('returns an empty string if the input string is empty', () => {
      const str = '';
      const limit = 10;

      const result = limitChars(str, limit);

      expect(result).toBe('');
    });
  });

  describe('limitCharsCentered', () => {
    test('returns empty string if input is empty', () => {
      const result = limitCharsCentered('', 10);
      expect(result).toBe('');
    });

    test('returns the same string if it is shorter than the limit', () => {
      const result = limitCharsCentered('Hello', 10);
      expect(result).toBe('Hello');
    });

    test('returns the same string if it is equal to the limit', () => {
      const result = limitCharsCentered('Hello World', 11);
      expect(result).toBe('Hello World');
    });

    test('returns the truncated string with ellipsis if it is longer than the limit', () => {
      const result = limitCharsCentered('This is a long string', 10);
      expect(result).toBe('This ...tring');
    });
  });
});
