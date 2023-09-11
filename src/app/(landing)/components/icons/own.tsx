type Props = {
  className?: string;
};

export default function Own({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        fill="#771AC9"
        d="M0 5.012A5.012 5.012 0 0 1 5.012 0h37.976A5.012 5.012 0 0 1 48 5.012v37.976A5.012 5.012 0 0 1 42.988 48H5.012A5.012 5.012 0 0 1 0 42.988V5.012Z"
      />
    </svg>
  );
}
