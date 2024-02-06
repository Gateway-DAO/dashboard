import { numberToMoneyString } from '../money';

describe('Utils: Money', () => {
  describe('numberToMoneyString', () => {
    it('should format the number to money string', () => {
      expect(numberToMoneyString(1000)).toEqual('$1,000.00');
      expect(numberToMoneyString(1234.5678)).toEqual('$1,234.568');
    });

    it('should return $0.00 for invalid input', () => {
      expect(numberToMoneyString(NaN)).toEqual('$0.00');
    });
  });
});
