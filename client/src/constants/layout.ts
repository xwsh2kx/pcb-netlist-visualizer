import type { Size, ComponentKind } from '@/types';

export const CANVAS: Size = {
  width: 1200,
  height: 700,
};

export const COMPONENT_SIZES: Record<ComponentKind, Size> = {
  ic: { width: 140, height: 90 },
  passive: { width: 70, height: 45 },
  connector: { width: 110, height: 55 },
  power: { width: 90, height: 50 },
};

export const GRID = {
  columns: 4,
  cellWidth: 220,
  cellHeight: 150,
  padding: 60,
};

export const WIRE = {
  extension: 25,
  labelWidth: 44,
  labelHeight: 18,
};

export const PIN = {
  radius: 5,
  dotRadius: 2,
  labelOffset: 14,
  spacing: 0.2,
};
