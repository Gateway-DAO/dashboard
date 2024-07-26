type Props = {
  className?: string;
};

export default function Data({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
      width={24}
    >
      <path d="M16.5 0v3H21v18h-4.5v3H24V0h-7.5ZM0 24h7.5v-3H3V3h4.5V0H0v24Z" />
    </svg>
  );
}
