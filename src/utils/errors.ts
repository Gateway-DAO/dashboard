export function handleError(error: any, defaultMessage?: string): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if ((error as any)?.error) {
    return (error as any).error;
  }
  return defaultMessage ?? 'An error occurred';
}
