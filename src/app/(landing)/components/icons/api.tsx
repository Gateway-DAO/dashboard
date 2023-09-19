type Props = {
  className?: string;
};

export default function Api({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 34 30"
      className={className}
      width={33}
    >
      <path d="m3.35 5.548 11.89 5.098L3.333 9.062l.016-3.514Zm11.874 13.806-11.89 5.099v-3.515l11.89-1.584ZM.183.75.167 11.833 23.917 15 .167 18.167.183 29.25 33.417 15 .183.75Z" />
    </svg>
  );
}
