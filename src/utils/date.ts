/**
 * Convert ISO date to string.
 */
export const timestampToString = (
  datetime: string,
  locale = 'en-US',
  nullableMessage: string
) => {
  if (!datetime) {
    return nullableMessage;
  }
  return new Date(datetime?.toLocaleString()).toLocaleString(locale);
};
