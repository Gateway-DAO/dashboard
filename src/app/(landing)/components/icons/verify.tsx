type Props = {
  className?: string;
};

export default function Verify({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 52 48"
      className={className}
    >
      <path
        fill="#E8E8F2"
        d="M14.541 6.474c5.007-8.632 17.472-8.632 22.479 0l12.768 22.014C54.812 37.15 48.562 48 38.548 48H13.013C3 48-3.25 37.15 1.773 28.488L14.541 6.474Z"
      />
    </svg>
  );
}
