type Props = {
  className?: string;
};

export default function Permission({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 32 32"
      className={className}
      width={31}
    >
      <path d="M16 .167C7.26.167.167 7.26.167 16S7.26 31.833 16 31.833 31.833 24.74 31.833 16 24.74.167 16 .167Zm0 28.5C9.018 28.667 3.333 22.983 3.333 16 3.333 9.018 9.018 3.333 16 3.333c6.983 0 12.667 5.685 12.667 12.667 0 6.983-5.684 12.667-12.667 12.667Zm7.268-19.665L12.833 19.436l-4.1-4.085L6.5 17.583l6.333 6.334L25.5 11.25l-2.232-2.248Z" />
    </svg>
  );
}
