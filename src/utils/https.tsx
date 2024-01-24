// a method that appends https if it's not there and its not http or localhost
export function appendHttps(url?: string) {
  if (!url) {
    return undefined;
  }
  if (!url.startsWith('http') && !url.includes('localhost')) {
    return `https://${url}`;
  }
  return url;
}
