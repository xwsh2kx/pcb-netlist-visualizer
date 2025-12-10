import type { ComponentKind, Size } from '@/types';
import { COMPONENT_PREFIXES, COMPONENT_SIZES } from '@/constants';

export function classifyComponent(ref: string): ComponentKind {
  const prefix = ref.replace(/[0-9]/g, '').toUpperCase();

  for (const [key, kind] of Object.entries(COMPONENT_PREFIXES)) {
    if (prefix.startsWith(key)) {
      return kind;
    }
  }

  return 'ic';
}

export function getComponentSize(kind: ComponentKind, pinCount: number): Size {
  const base = COMPONENT_SIZES[kind];

  const pinsPerSide = Math.ceil(pinCount / 2);
  const minHeightForPins = pinsPerSide * 22 + 20;

  if (kind === 'ic') {
    const width = Math.max(base.width, 120 + pinCount * 4);
    const height = Math.max(base.height, minHeightForPins);
    return { width: Math.min(width, 220), height: Math.min(height, 160) };
  }

  if (kind === 'connector') {
    const height = Math.max(base.height, minHeightForPins);
    return { width: base.width, height: Math.min(height, 140) };
  }

  return {
    width: base.width,
    height: Math.max(base.height, pinCount * 20),
  };
}