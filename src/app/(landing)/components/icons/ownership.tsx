type Props = {
  className?: string;
};

export default function Ownership({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 34 18"
      className={className}
      width={33}
    >
      <path d="M30.5 6H17.975A8.986 8.986 0 0 0 9.5 0c-4.965 0-9 4.035-9 9s4.035 9 9 9a8.986 8.986 0 0 0 8.475-6h.525l3 3 3-3 3 3 6-6.06-3-2.94Zm-21 7.5A4.513 4.513 0 0 1 5 9c0-2.475 2.025-4.5 4.5-4.5S14 6.525 14 9s-2.025 4.5-4.5 4.5Z" />
    </svg>
  );
}
