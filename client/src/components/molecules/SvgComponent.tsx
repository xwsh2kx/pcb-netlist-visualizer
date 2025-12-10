import type { ComponentShape } from '@/types';
import { SvgPin } from './SvgPin';

interface SvgComponentProps {
  component: ComponentShape;
}

export function SvgComponent({ component }: SvgComponentProps) {
  const { x, y, width, height, ref, value, kind, pins } = component;
  
  const left = x - width / 2;
  const top = y - height / 2;
  const radius = kind === 'connector' ? 4 : 8;
  const gradient = kind === 'connector' ? 'url(#connectorGrad)' : 'url(#componentGrad)';

  return (
    <g>
      <rect
        x={left}
        y={top}
        width={width}
        height={height}
        rx={radius}
        fill={gradient}
        stroke="var(--chakra-colors-schematic-componentStroke)"
        strokeWidth={1.5}
        filter="url(#shadow)"
      />
      
      <text
        x={x}
        y={y - 5}
        fontSize={13}
        fontWeight={600}
        textAnchor="middle"
        fill="var(--chakra-colors-gray-700)"
        fontFamily="var(--chakra-fonts-body)"
      >
        {ref}
      </text>
      
      <text
        x={x}
        y={y + 10}
        fontSize={10}
        textAnchor="middle"
        fill="var(--chakra-colors-gray-500)"
        fontFamily="var(--chakra-fonts-mono)"
      >
        {value}
      </text>
      
      {pins.map(pin => (
        <SvgPin key={pin.name} pin={pin} />
      ))}
    </g>
  );
}
