type Props = {
  className?: string;
};

export default function CardId({ className }: Props) {
  return (
    <svg
      viewBox="14 0 368 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_d_29_2868)">
        <rect
          x="149.828"
          y="12.7596"
          width="97.133"
          height="217.957"
          rx="48.5665"
          fill="#F5B5FF"
        />
        <rect
          x="44.7979"
          y="68.0386"
          width="97.133"
          height="162.678"
          rx="48.5665"
          fill="#70ECFE"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 254.977V142.491C27.751 151.067 36.9013 166.33 36.9013 183.729V213.738C36.9013 231.138 27.751 246.401 14 254.977Z"
          fill="#F5B5FF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M382 254.977V142.491C368.249 151.067 359.099 166.33 359.099 183.729V213.738C359.099 231.138 368.249 246.401 382 254.977Z"
          fill="#F5B5FF"
        />
        <rect
          x="254.858"
          y="68.0386"
          width="97.133"
          height="162.678"
          rx="48.5665"
          fill="#70ECFE"
        />
        <path
          d="M172.729 271.781H224.106V231.414C224.106 217.226 212.605 205.725 198.418 205.725C184.231 205.725 172.729 217.226 172.729 231.414V271.781Z"
          fill="white"
        />
        <circle cx="198.418" cy="171.907" r="25.6885" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_29_2868"
          x="0"
          y="0.759644"
          width="408"
          height="299.022"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="6" dy="8" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.466667 0 0 0 0 0.101961 0 0 0 0 0.788235 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_29_2868"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_29_2868"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
