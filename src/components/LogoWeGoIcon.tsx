import React from "react";

type Props = { className?: string };

export default function LogoWeGoIcon({ className = "h-10 w-10" }: Props) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="wgVivid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00E5FF" />
          <stop offset="0.22" stopColor="#00F5A0" />
          <stop offset="0.44" stopColor="#FFE066" />
          <stop offset="0.66" stopColor="#FF8A00" />
          <stop offset="0.82" stopColor="#FF4D97" />
          <stop offset="1" stopColor="#B366FF" />
        </linearGradient>

        <filter id="wgGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="32" cy="32" r="28" fill="none" stroke="url(#wgVivid)" strokeWidth="5" filter="url(#wgGlow)" />

      <circle cx="21.5" cy="22.5" r="6" fill="url(#wgVivid)" />
      <circle cx="42.5" cy="22.5" r="6" fill="url(#wgVivid)" />

      <path
        d="M18 36c6 0 9 9 14 9s8-9 14-9"
        stroke="url(#wgVivid)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18 34c4 0 7-1 14 6c7-7 10-6 14-6"
        stroke="url(#wgVivid)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity=".95"
      />
    </svg>
  );
}
