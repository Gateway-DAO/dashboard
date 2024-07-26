type Props = {
  className?: string;
};

export default function Manage({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        fill="#70ECFE"
        d="M48 24c0 13.255-10.745 24-24 24S0 37.255 0 24 10.745 0 24 0s24 10.745 24 24Z"
      />
    </svg>
  );
}
