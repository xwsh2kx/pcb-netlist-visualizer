import type { Netlist, ComponentShape, WireShape, Point, Side } from '@/types';
import { WIRE } from '@/constants';

export function routeWires(netlist: Netlist, components: ComponentShape[]): WireShape[] {
  const componentMap = new Map(components.map(c => [c.ref, c]));
  const wires: WireShape[] = [];
  
  for (const net of netlist.nets) {
    if (net.nodes.length < 2) continue;
    
    const endpoints = resolveEndpoints(net.nodes, componentMap);
    if (endpoints.length < 2) continue;
    
    for (let i = 0; i < endpoints.length - 1; i++) {
      const path = createPath(endpoints[i], endpoints[i + 1]);
      const labelPosition = findLabelPosition(path);
      
      wires.push({
        netName: net.name,
        path,
        labelPosition,
      });
    }
  }
  
  return wires;
}

interface Endpoint {
  position: Point;
  side: Side;
}

function resolveEndpoints(
  nodes: Array<{ ref: string; pin: string }>,
  components: Map<string, ComponentShape>
): Endpoint[] {
  const endpoints: Endpoint[] = [];
  
  for (const node of nodes) {
    const component = components.get(node.ref);
    if (!component) continue;
    
    const pin = component.pins.find(p => p.name === node.pin);
    if (!pin) continue;
    
    endpoints.push({
      position: pin.position,
      side: pin.side,
    });
  }
  
  return endpoints;
}

function createPath(from: Endpoint, to: Endpoint): Point[] {
  const path: Point[] = [];
  const ext = WIRE.extension;
  
  path.push(from.position);
  
  const fromExt = extend(from.position, from.side, ext);
  const toExt = extend(to.position, to.side, ext);
  
  path.push(fromExt);
  path.push(...computeMidpoints(fromExt, toExt, from.side, to.side));
  path.push(toExt);
  path.push(to.position);
  
  return deduplicate(path);
}

function extend(point: Point, side: Side, distance: number): Point {
  switch (side) {
    case 'left': return { x: point.x - distance, y: point.y };
    case 'right': return { x: point.x + distance, y: point.y };
    case 'top': return { x: point.x, y: point.y - distance };
    case 'bottom': return { x: point.x, y: point.y + distance };
  }
}

function computeMidpoints(from: Point, to: Point, fromSide: Side, toSide: Side): Point[] {
  const horizontal = (s: Side) => s === 'left' || s === 'right';
  
  if (horizontal(fromSide) && horizontal(toSide)) {
    const midX = (from.x + to.x) / 2;
    return [{ x: midX, y: from.y }, { x: midX, y: to.y }];
  }
  
  if (!horizontal(fromSide) && !horizontal(toSide)) {
    const midY = (from.y + to.y) / 2;
    return [{ x: from.x, y: midY }, { x: to.x, y: midY }];
  }
  
  if (horizontal(fromSide)) {
    return [{ x: to.x, y: from.y }];
  }
  
  return [{ x: from.x, y: to.y }];
}

function deduplicate(points: Point[]): Point[] {
  return points.filter((point, index) => {
    if (index === 0) return true;
    const prev = points[index - 1];
    return Math.abs(point.x - prev.x) > 1 || Math.abs(point.y - prev.y) > 1;
  });
}

function findLabelPosition(path: Point[]): Point {
  let bestMid: Point = path[0];
  let maxLength = 0;
  
  for (let i = 0; i < path.length - 1; i++) {
    const length = distance(path[i], path[i + 1]);
    if (length > maxLength) {
      maxLength = length;
      bestMid = midpoint(path[i], path[i + 1]);
    }
  }
  
  return bestMid;
}

function distance(a: Point, b: Point): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}
