export function Logo({ className = "h-auto w-[170px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 254 96"
      className={`block ${className}`}
      role="img"
      aria-label="Heizöl Austria, 4,9 von 5 Sternen"
    >
      {/* Österreich: Rot-Weiß-Rot */}
      <rect x="0" y="0" width="12" height="32" rx="2" fill="#D7182A" />
      <rect x="0" y="32" width="12" height="32" fill="#FFFFFF" stroke="#D7182A" strokeWidth="0.5" />
      <rect x="0" y="64" width="12" height="32" rx="2" fill="#D7182A" />
      <text x="22" y="34" fill="#171717" fontFamily="Roboto, Arial, sans-serif" fontSize="30" fontWeight="800" letterSpacing="1">HEIZÖL</text>
      <text x="22" y="64" fill="#171717" fontFamily="Roboto, Arial, sans-serif" fontSize="29" fontWeight="300" letterSpacing="2">AUSTRIA</text>
      <text x="22" y="91" fill="#F4C430" fontFamily="Arial, sans-serif" fontSize="23">★★★★★</text>
      <text x="143" y="90" fill="#171717" fontFamily="Roboto, Arial, sans-serif" fontSize="17" fontWeight="700">4,9</text>
    </svg>
  );
}
