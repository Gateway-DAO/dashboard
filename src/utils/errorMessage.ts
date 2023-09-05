import { errorMessages } from '@/locale/en/errors';

export const transformErrorObject = ({ error, message }: any) =>
  errorMessages[message] ??
  errorMessages[error] ??
  errorMessages.UNEXPECTED_ERROR;

export const transformErrorMessage = (error: any) =>
  errorMessages[error?.response?.errors?.[0]?.message] ??
  error?.response?.errors?.[0]?.message ??
  error?.response?.errors?.[0]?.error ??
  error?.message ??
  errorMessages.UNEXPECTED_ERROR;
