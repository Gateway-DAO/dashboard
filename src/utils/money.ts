export const numberToMoneyString = (value: number) => {
  try {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
      maximumFractionDigits: 3,
    });
  } catch (error) {
    return '$0.00';
  }
};
