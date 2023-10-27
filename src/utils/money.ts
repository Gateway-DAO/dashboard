export const numberToMoneyString = (value: number) => {
  try {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
    });
  } catch (error) {
    return '$0';
  }
};
