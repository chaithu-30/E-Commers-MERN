const Logo = ({ size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block' }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9900" />
          <stop offset="100%" stopColor="#FF6600" />
        </linearGradient>
      </defs>
      <rect x="10" y="30" width="70" height="55" rx="8" fill="url(#logoGradient)" />
      <path
        d="M30 35 L30 45 L50 45 L55 35 Z"
        fill="white"
        opacity="0.3"
      />
      <circle cx="32" cy="75" r="5" fill="white" />
      <circle cx="58" cy="75" r="5" fill="white" />
      <path
        d="M45 20 L55 30 L70 25 L65 15 Z"
        fill="url(#logoGradient)"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M48 22 L52 28 M60 22 L58 28"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;

