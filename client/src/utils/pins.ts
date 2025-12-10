import type { Netlist, Side, Point, PinShape } from '@/types';
import { POWER_PINS, GROUND_PINS, INPUT_PINS, OUTPUT_PINS, CONTROL_PINS } from '@/constants';

export function extractPins(netlist: Netlist, componentRef: string): string[] {
  const pins = new Set<string>();
  
  for (const net of netlist.nets) {
    for (const node of net.nodes) {
      if (node.ref === componentRef) {
        pins.add(node.pin);
      }
    }
  }
  
  return sortPins(Array.from(pins));
}

function sortPins(pins: string[]): string[] {
  return pins.sort((a, b) => {
    const numA = parseInt(a, 10);
    const numB = parseInt(b, 10);
    
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    
    return a.localeCompare(b);
  });
}

export function determineSide(pinName: string, index: number, total: number): Side {
  const upper = pinName.toUpperCase();
  
  if (matchesAny(upper, POWER_PINS)) return 'top';
  if (matchesAny(upper, GROUND_PINS)) return 'bottom';
  if (matchesAny(upper, INPUT_PINS)) return 'left';
  if (matchesAny(upper, OUTPUT_PINS)) return 'right';
  if (matchesAny(upper, CONTROL_PINS)) return 'top';
  
  if (/^\d+$/.test(pinName)) {
    const num = parseInt(pinName, 10);
    return num <= Math.ceil(total / 2) ? 'left' : 'right';
  }
  
  return index < total / 2 ? 'left' : 'right';
}

function matchesAny(value: string, patterns: string[]): boolean {
  return patterns.some(p => value.includes(p));
}

export function calculatePinPositions(
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  pinNames: string[]
): PinShape[] {
  const grouped = groupBySide(pinNames);
  const pins: PinShape[] = [];
  
  for (const [side, sidePins] of grouped) {
    sidePins.forEach((name, index) => {
      const position = computePosition(
        centerX, centerY, width, height,
        side, index, sidePins.length
      );
      pins.push({ name, side, position });
    });
  }
  
  return pins;
}

function groupBySide(pinNames: string[]): Map<Side, string[]> {
  const groups = new Map<Side, string[]>();
  const total = pinNames.length;
  
  pinNames.forEach((name, index) => {
    const side = determineSide(name, index, total);
    const existing = groups.get(side) ?? [];
    groups.set(side, [...existing, name]);
  });
  
  return groups;
}

function computePosition(
  cx: number,
  cy: number,
  w: number,
  h: number,
  side: Side,
  index: number,
  count: number
): Point {
  const fraction = (index + 1) / (count + 1);
  const left = cx - w / 2;
  const top = cy - h / 2;
  
  switch (side) {
    case 'left':
      return { x: left, y: top + h * fraction };
    case 'right':
      return { x: left + w, y: top + h * fraction };
    case 'top':
      return { x: left + w * fraction, y: top };
    case 'bottom':
      return { x: left + w * fraction, y: top + h };
  }
}
