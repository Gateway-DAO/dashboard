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

export const limitCharsOffset = (
  str: string,
  leftChards: number,
  rightChars: number
) => {
  if (!str) return '';
  if (str.length > leftChards + rightChars) {
    return (
      str.substring(0, leftChards) +
      '...' +
      str.substring(str.length - rightChars, str.length)
    );
  }
};
