import type { PinShape } from '@/types';
import { PIN } from '@/constants';

interface SvgPinProps {
  pin: PinShape;
}

export function SvgPin({ pin }: SvgPinProps) {
  const { position, name, side } = pin;
  const label = getLabelPosition(position.x, position.y, side);

  return (
    <g>
      <circle
        cx={position.x}
        cy={position.y}
        r={PIN.radius}
        fill="var(--chakra-colors-schematic-pin)"
        stroke="var(--chakra-colors-schematic-pinStroke)"
        strokeWidth={1.5}
      />
      <circle
        cx={position.x}
        cy={position.y}
        r={PIN.dotRadius}
        fill="var(--chakra-colors-schematic-pinDot)"
      />
      <text
        x={label.x}
        y={label.y}
        fontSize={9}
        textAnchor={label.anchor}
        dominantBaseline="middle"
        fill="var(--chakra-colors-gray-500)"
        fontFamily="var(--chakra-fonts-mono)"
      >
        {name}
      </text>
    </g>
  );
}

function getLabelPosition(x: number, y: number, side: PinShape['side']) {
  const offset = PIN.labelOffset;
  
  switch (side) {
    case 'left':
      return { x: x - offset, y, anchor: 'end' as const };
    case 'right':
      return { x: x + offset, y, anchor: 'start' as const };
    case 'top':
      return { x, y: y - offset, anchor: 'middle' as const };
    case 'bottom':
      return { x, y: y + offset, anchor: 'middle' as const };
  }
}
