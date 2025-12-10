import type { WireShape } from '@/types';
import { pathToString } from '@/utils';
import { WIRE } from '@/constants';

interface SvgWireProps {
  wire: WireShape;
}

export function SvgWire({ wire }: SvgWireProps) {
  const { path, netName, labelPosition } = wire;
  const d = pathToString(path);

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="var(--chakra-colors-schematic-wireShadow)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.15}
      />
      <path
        d={d}
        fill="none"
        stroke="var(--chakra-colors-schematic-wire)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={labelPosition.x - WIRE.labelWidth / 2}
        y={labelPosition.y - WIRE.labelHeight / 2}
        width={WIRE.labelWidth}
        height={WIRE.labelHeight}
        rx={3}
        fill="var(--chakra-colors-gray-100)"
        stroke="var(--chakra-colors-gray-300)"
        strokeWidth={0.5}
      />
      <text
        x={labelPosition.x}
        y={labelPosition.y}
        fontSize={8}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--chakra-colors-gray-600)"
        fontFamily="var(--chakra-fonts-mono)"
        fontWeight={500}
      >
        {netName}
      </text>
    </g>
  );
}
