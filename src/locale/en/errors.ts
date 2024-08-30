export const errorMessages = {
  UNKNOWN_USER: 'this account does not exist',
  INVALID_TOKEN: 'Invalid token: token is expired',
} as const;

export const errorsValuesAsKeys = Object.keys(errorMessages).reduce(
  (acc, key) => ({
    ...acc,
    [errorMessages[key as keyof typeof errorMessages]]:
      key as keyof typeof errorMessages,
  }),
  {} as Record<string, keyof typeof errorMessages>
);
