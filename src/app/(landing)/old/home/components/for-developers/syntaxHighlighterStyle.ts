import { CSSProperties } from "react";

const syntaxHighlighterStyle: { [className: string]: CSSProperties } = {
  'hljs': {
    'display': 'block',
    'overflowX': 'auto',
    'color': '#55B5DB',
    'padding': '0.5em',
    'fontSize': '14px',
    'fontFamily': 'monospace',
  },
  'hljs-keyword': {
    'color': '#E6CD69',
    'fontWeight': 'bold'
  },
  'hljs-string': {
    'color': '#55B5DB'
  },
  'hljs-variable': {
    'color': '#9CDCFE'
  },
  'hljs-attr': {
    'color': '#A074C4',
    'fontWeight': 'bold'
  },
  'hljs-template-variable': {
    'color': '#9CDCFE'
  },
  'hljs-template-tag': {
    'color': '#CFD2D1'
  },
  'hljs-name': {
    'color': '#55B5DB'
  },
  'hljs-section': {
    'color': '#E6CD69'
  },
  'hljs-literal': {
    'color': '#9FCA56'
  },
  'hljs-type': {
    'color': '#55B5DB'
  },
  'hljs-addition': {
    'color': '#CFD2D1'
  },
  'hljs-deletion': {
    'color': '#CFD2D1'
  },
  'linenumber': {
    'color': '#6D8A88'
  },
};

export default syntaxHighlighterStyle;
