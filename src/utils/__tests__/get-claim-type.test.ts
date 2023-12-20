import { titleCase } from 'title-case';

import getClaimType, {
  ClaimField,
  getClaimDefaultValue,
  getClaimExample,
  getClaimTitle,
} from '../get-claim-type';

jest.mock('title-case', () => ({
  titleCase: (str: string) => str,
}));

describe('Utils: Claim Type', () => {
  describe('get claim type', () => {
    it('should return the number claim type', () => {
      expect(getClaimType({ type: 'number' })).toEqual(ClaimField.Number);
      expect(getClaimType({ type: 'integer' })).toEqual(ClaimField.Number);
      expect(getClaimType({ type: 'float' })).toEqual(ClaimField.Number);
    });
    it('should return the boolean claim type', () => {
      expect(getClaimType({ type: 'boolean' })).toEqual(ClaimField.Boolean);
    });
    it('should return the array claim type', () => {
      expect(getClaimType({ type: 'array' })).toEqual(ClaimField.Array);
    });
    it('should return the text claim type', () => {
      expect(getClaimType({ type: 'string' })).toEqual(ClaimField.Text);
    });
    it('should return the unknown claim type', () => {
      expect(getClaimType({ type: 'abc' })).toEqual(ClaimField.Unknown);
    });
    it('should return the date claim type', () => {
      expect(getClaimType({ type: 'string', format: 'date' })).toEqual(
        ClaimField.Date
      );
    });
    it('should return the datetime claim type', () => {
      expect(getClaimType({ type: 'string', format: 'date-time' })).toEqual(
        ClaimField.DateTime
      );
    });
    it('should return the time claim type', () => {
      expect(getClaimType({ type: 'string', format: 'time' })).toEqual(
        ClaimField.Time
      );
    });
    it('should return the link claim type', () => {
      expect(getClaimType({ type: 'string', format: 'uri' })).toEqual(
        ClaimField.Link
      );
    });
    it('should return the image claim type', () => {
      expect(
        getClaimType({ type: 'string', contentMediaType: 'image/png' })
      ).toEqual(ClaimField.Image);
    });
    it('should return the currency claim type', () => {
      expect(getClaimType({ type: 'string', currency: 'USD' })).toEqual(
        ClaimField.Currency
      );
    });
    it('should return the select claim type', () => {
      expect(getClaimType({ type: 'string', enum: ['USD'] })).toEqual(
        ClaimField.Select
      );
    });
  });

  describe('get claim title', () => {
    it('should return the title based on the property', () => {
      expect(getClaimTitle({ type: 'string', title: 'Title' })).toEqual(
        'Title'
      );
    });
    it("should return the title based on the id, when title doesn't exists on the property", () => {
      expect(getClaimTitle({ type: 'string' }, 'title')).toEqual('title');
    });
  });

  describe('get claim examples', () => {
    it('should return the examples', () => {
      expect(
        getClaimExample({ type: 'string', examples: ['example1'] })
      ).toEqual('example1');
      expect(
        getClaimExample({ type: 'string', examples: ['example1', 'example2'] })
      ).toEqual('example1, example2');
    });

    it('should return the array examples', () => {
      expect(
        getClaimExample({
          type: 'array',
          items: {
            type: 'string',
            examples: ['example1'],
          },
        })
      ).toEqual('example1');
      expect(
        getClaimExample({
          type: 'array',
          items: {
            type: 'string',
            examples: ['example1', 'example2'],
          },
        })
      ).toEqual('example1, example2');
    });
  });

  describe('get claim default value', () => {
    it('should return the default value', () => {
      expect(
        getClaimDefaultValue({ type: 'string', default: 'example1' })
      ).toEqual('example1');
    });

    it('should return the array default value', () => {
      expect(
        getClaimDefaultValue({
          type: 'string',
          items: {
            type: 'string',
            default: 'example1',
          },
        })
      ).toEqual('example1');
    });
  });
});
