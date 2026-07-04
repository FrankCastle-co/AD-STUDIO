import { SVGProps } from 'react';

export default function AdStudioLogo({ className = 'w-10 h-10', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Gradients to match the beautiful uploaded blue-to-teal logo */}
        <linearGradient id="gradient-a" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="gradient-d" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>

      {/* Styled letter "A" shape */}
      <path
        d="M 170 340 L 245 190 Q 250 180 255 190 L 330 340"
        stroke="url(#gradient-a)"
        strokeWidth="48"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Styled letter "D" shape */}
      <path
        d="M 315 190 L 360 190 C 420 190 450 220 450 265 C 450 310 420 340 360 340 L 330 340"
        stroke="url(#gradient-d)"
        strokeWidth="48"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
