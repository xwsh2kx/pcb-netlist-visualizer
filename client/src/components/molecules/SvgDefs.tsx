export function SvgDefs() {
  return (
    <defs>
      <linearGradient id="componentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f7fafc" />
      </linearGradient>
      
      <linearGradient id="connectorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f7fafc" />
        <stop offset="100%" stopColor="#edf2f7" />
      </linearGradient>
      
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow
          dx="0"
          dy="1"
          stdDeviation="2"
          floodColor="#000000"
          floodOpacity="0.1"
        />
      </filter>
      
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.5" fill="#e2e8f0" />
      </pattern>
    </defs>
  );
}
