export function Logo({ className = "h-auto w-[170px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 254 70"
      className={`block ${className}`}
      role="img"
      aria-label="Heizöl Austria"
    >
      {/* Österreich: Rot-Weiß-Rot */}
      <rect x="0" y="0" width="12" height="23" rx="2" fill="#D7182A" />
      <rect x="0" y="23" width="12" height="23" fill="#FFFFFF" stroke="#D7182A" strokeWidth="0.5" />
      <rect x="0" y="46" width="12" height="24" rx="2" fill="#D7182A" />
      <text x="22" y="34" fill="#171717" fontFamily="Roboto, Arial, sans-serif" fontSize="30" fontWeight="800" letterSpacing="1">HEIZÖL</text>
      <text x="22" y="64" fill="#171717" fontFamily="Roboto, Arial, sans-serif" fontSize="29" fontWeight="300" letterSpacing="2">AUSTRIA</text>
    </svg>
  );
}
