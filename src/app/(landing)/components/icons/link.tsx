type Props = {
  className?: string;
};

export default function Link({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 18"
      className={className}
    >
      <path d="M16 16H2V2h7V0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V9h-2v7ZM11 0v2h3.59l-9.83 9.83 1.41 1.41L16 3.41V7h2V0h-7Z" />
    </svg>
  );
}
