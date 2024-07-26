type Props = {
  className?: string;
};

export default function Star({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 30 29"
      className={className}
      width={30}
    >
      <path d="m30 10.86-10.785-.93L15 0l-4.215 9.945L0 10.86l8.19 7.095L5.73 28.5 15 22.905l9.27 5.595-2.445-10.545L30 10.86ZM15 20.1l-5.64 3.405 1.5-6.42-4.98-4.32 6.57-.57L15 6.15l2.565 6.06 6.57.57-4.98 4.32 1.5 6.42L15 20.1Z" />
    </svg>
  );
}
