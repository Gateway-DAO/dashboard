type Props = {
  className?: string;
};

export default function Issue({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        fill="#F5B5FF"
        d="M1.772 28.278a6.05 6.05 0 0 1 0-8.556l17.95-17.95a6.05 6.05 0 0 1 8.556 0l17.95 17.95a6.05 6.05 0 0 1 0 8.556l-17.95 17.95a6.05 6.05 0 0 1-8.556 0l-17.95-17.95Z"
      />
    </svg>
  );
}
