const FORMATS = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

export const formatBytes = (bytes: number) => {
  let i = 0;

  while (1023 < bytes) {
    bytes /= 1024;
    ++i;
  }

  return (i ? bytes.toFixed(2) : bytes) + ' ' + FORMATS[i];
};
