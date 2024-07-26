type Props = {
  className?: string;
};

export default function Organizations({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 30 30"
      className={className}
      width={29}
    >
      <path d="m20.99 4.78 4.245 4.245-4.245 4.245-4.245-4.245L20.99 4.78ZM9.5 5.5v6h-6v-6h6Zm15 15v6h-6v-6h6Zm-15 0v6h-6v-6h6ZM20.99.535 12.5 9.01l8.49 8.49 8.49-8.49L20.99.535ZM12.5 2.5H.5v12h12v-12Zm15 15h-12v12h12v-12Zm-15 0H.5v12h12v-12Z" />
    </svg>
  );
}
