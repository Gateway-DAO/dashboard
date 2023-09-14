export const splitSpans = (
  element: HTMLSpanElement,
  callback?: (spans: HTMLSpanElement[]) => void
) => {
  const text = element.innerText;
  const spans = text.split('').map((letter) => {
    const span = document.createElement('span');
    span.innerText = letter;
    return span;
  });
  element.innerHTML = '';
  spans.forEach((span) => element.appendChild(span));

  callback && callback(spans);

  return spans;
};
