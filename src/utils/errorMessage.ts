import { errorMessages } from '@/locale/en/errors';

export const transformErrorObject = ({ error, message }: any) =>
  (errorMessages as Record<string, string>)[message] ??
  (errorMessages as Record<string, string>)[error] ??
  errorMessages.UNEXPECTED_ERROR;

export const transformErrorMessage = (error: any) =>
  (errorMessages as Record<string, string>)[
    error?.response?.errors?.[0]?.message
  ] ??
  error?.response?.errors?.[0]?.message ??
  error?.response?.errors?.[0]?.error ??
  error?.message ??
  errorMessages.UNEXPECTED_ERROR;
