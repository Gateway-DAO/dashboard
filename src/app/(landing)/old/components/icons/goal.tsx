type Props = {
  className?: string;
};

export default function Goal({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 34 34"
      className={className}
      width={33}
    >
      <path d="M9.5 15.5h-9v3h9v-3Zm3.255-4.86-3.18-3.18L7.46 9.575l3.18 3.18 2.115-2.115ZM18.5.5h-3v9h3v-9Zm8.04 9.075L24.425 7.46l-3.18 3.18 2.115 2.115 3.18-3.18ZM24.5 15.5v3h9v-3h-9Zm-7.5-3c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5Zm4.245 10.86 3.18 3.18 2.115-2.115-3.18-3.18-2.115 2.115ZM7.46 24.425l2.115 2.115 3.18-3.18-2.115-2.115-3.18 3.18ZM15.5 33.5h3v-9h-3v9Z" />
    </svg>
  );
}
