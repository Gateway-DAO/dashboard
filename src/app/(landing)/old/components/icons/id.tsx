type Props = {
  className?: string;
};

export default function Id({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 30 30"
      className={className}
      width={30}
    >
      <path d="M24 15h-6v2.25h6V15ZM24 19.5h-6v2.25h6V19.5Z" />
      <path d="M27 7.5h-7.5V3c0-1.65-1.35-3-3-3h-3c-1.65 0-3 1.35-3 3v4.5H3c-1.65 0-3 1.35-3 3V27c0 1.65 1.35 3 3 3h24c1.65 0 3-1.35 3-3V10.5c0-1.65-1.35-3-3-3Zm-13.5 0V3h3v7.5h-3v-3ZM27 27H3V10.5h7.5c0 1.65 1.35 3 3 3h3c1.65 0 3-1.35 3-3H27V27Z" />
      <path d="M10.5 19.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM13.62 21.27a7.742 7.742 0 0 0-3.12-.645c-1.11 0-2.16.225-3.12.645-.84.36-1.38 1.17-1.38 2.085V24h9v-.645c0-.915-.54-1.725-1.38-2.085Z" />
    </svg>
  );
}
