type Props = {
  className?: string;
};

export default function LogoSubstrack({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 20"
      className={className}
    >
      <path d="M0 0h17.499v2.363H0V0ZM17.499 4.505H0V6.87h17.499V4.505ZM0 9.01V20l8.75-4.908L17.5 20V9.01H0Z" />
    </svg>
  );
}
