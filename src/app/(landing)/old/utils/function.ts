export const joinClasses = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
