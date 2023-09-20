export const splitSpans = (
  element: HTMLSpanElement,
  expression = '',
  callback?: (spans: HTMLSpanElement[]) => void
) => {
  const text = element.innerText;
  const spans = text.split(expression).map((letter) => {
    const span = document.createElement('span');
    span.innerText = letter;
    return span;
  });
  element.innerHTML = '';
  spans.forEach((span) => element.appendChild(span));

  callback && callback(spans);

  return spans;
};

export const spliWordsBySpan = (
  element: HTMLSpanElement,
  callback?: (spans: HTMLSpanElement[]) => void
) => {
  const text = element.innerText;
  const spans = text.split(' ').map((letter) => {
    const span = document.createElement('span');
    span.innerText = letter;
    span.setAttribute('data-word', '');
    return span;
  });
  element.innerHTML = '';
  spans.forEach((span) => {
    element.appendChild(document.createTextNode(' '));
    element.appendChild(span);
  });

  callback && callback(spans);

  return spans;
};

export const calculateLines = (element: HTMLElement): number => {
  const computedStyle = getComputedStyle(element);
  const lineHeight = parseInt(computedStyle.lineHeight);
  const textHeight = element.clientHeight;
  const lines = Math.floor(textHeight / lineHeight);
  return lines;
};

export const findClosestNumbersWithIndices = (
  entries: number[],
  target: number,
  count: number
): { number: number; index: number }[] => {
  if (entries.length === 0 || count > entries.length) {
    throw new Error('Empty entries or count is greater than entries length');
  }

  const entriesWithIndices = entries.map((number, index) => ({
    number,
    index,
  }));

  entriesWithIndices.sort(
    (a, b) => Math.abs(a.number - target) - Math.abs(b.number - target)
  );

  return entriesWithIndices.slice(0, count);
};
