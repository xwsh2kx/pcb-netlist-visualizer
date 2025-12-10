import type { Netlist, ComponentShape, Size } from '@/types';
import { CANVAS, GRID } from '@/constants';
import { classifyComponent, getComponentSize } from './classifier';
import { extractPins, calculatePinPositions } from './pins';

export function layoutComponents(netlist: Netlist): ComponentShape[] {
  const { components } = netlist;
  const positions = computeGridPositions(components.length);
  
  return components.map((component, index) => {
    const pins = extractPins(netlist, component.ref);
    const kind = classifyComponent(component.ref);
    const size = getComponentSize(kind, pins.length);
    const center = positions[index];
    
    const pinShapes = calculatePinPositions(
      center.x, center.y,
      size.width, size.height,
      pins
    );
    
    return {
      ref: component.ref,
      value: component.value,
      kind,
      x: center.x,
      y: center.y,
      width: size.width,
      height: size.height,
      pins: pinShapes,
    };
  });
}

function computeGridPositions(count: number): Array<{ x: number; y: number }> {
  const cols = Math.min(count, GRID.columns);
  const rows = Math.ceil(count / cols);

  const totalWidth = cols * GRID.cellWidth;
  const totalHeight = rows * GRID.cellHeight;

  const canvasSize = computeCanvasSize(count);

  const startX = (canvasSize.width - totalWidth) / 2 + GRID.cellWidth / 2;
  const startY = Math.max(GRID.padding + GRID.cellHeight / 2, (canvasSize.height - totalHeight) / 2 + GRID.cellHeight / 2);

  const positions: Array<{ x: number; y: number }> = [];

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    positions.push({
      x: startX + col * GRID.cellWidth,
      y: startY + row * GRID.cellHeight,
    });
  }

  return positions;
}

export function computeCanvasSize(componentCount: number): Size {
  if (componentCount <= 4) return CANVAS;
  
  const cols = Math.min(componentCount, GRID.columns);
  const rows = Math.ceil(componentCount / cols);
  
  return {
    width: Math.max(CANVAS.width, cols * GRID.cellWidth + GRID.padding * 2),
    height: Math.max(CANVAS.height, rows * GRID.cellHeight + GRID.padding * 2),
  };
}
