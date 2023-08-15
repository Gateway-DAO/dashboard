/**
 * Limit String by length, adding "..." if necessary.
 */
export const limitChars = (str: string, limit: number) => {
  if (str.length > limit) {
    return str.substring(0, limit) + '...';
  }
  return str;
};

export const limitCharsCentered = (str: string, characters: number) => {
  if (!str) return '';
  if (str.length > characters) {
    return (
      str.substring(0, characters / 2) +
      '...' +
      str.substring(str.length - characters / 2, str.length)
    );
  }
  return str;
};
