type Props = {
  className?: string;
};

export default function Criteria({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 29 20"
      className={className}
      width={28.5}
    >
      <path d="M17 6H.5v3H17V6ZM17 0H.5v3H17V0ZM11 12H.5v3H11v-3ZM26.885 8.895l-6.375 6.36-3.18-3.18-2.115 2.115 5.295 5.31L29 11.01l-2.115-2.115Z" />
    </svg>
  );
}
