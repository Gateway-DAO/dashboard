type Props = {
  className?: string;
};

export default function Lock({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 32"
      className={className}
      width={24}
    >
      <path d="M21 11h-1.5V8c0-4.14-3.36-7.5-7.5-7.5C7.86.5 4.5 3.86 4.5 8h3c0-2.49 2.01-4.5 4.5-4.5s4.5 2.01 4.5 4.5v3H3c-1.65 0-3 1.35-3 3v15c0 1.65 1.35 3 3 3h18c1.65 0 3-1.35 3-3V14c0-1.65-1.35-3-3-3Zm0 18H3V14h18v15Zm-9-4.5c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3Z" />
    </svg>
  );
}
