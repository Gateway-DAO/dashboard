const FORMATS = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'] as const;

export const formatBytes = (bytes: number) => {
  let i = 0;

  while (1023 < bytes) {
    bytes /= 1024;
    ++i;
  }

  return (i ? bytes.toFixed(2) : bytes) + ' ' + FORMATS[i];
};

export const convertBytes = (bytes: number, to: (typeof FORMATS)[number]) => {
  const i = FORMATS.indexOf(to);

  if (i === -1) {
    throw new Error('Invalid format');
  }

  return bytes / Math.pow(1024, i);
};
