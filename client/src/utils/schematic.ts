import type { Netlist, SchematicData } from '@/types';
import { layoutComponents, computeCanvasSize } from './layout';
import { routeWires } from './routing';

export function buildSchematic(netlist: Netlist): SchematicData {
  const components = layoutComponents(netlist);
  const wires = routeWires(netlist, components);
  const bounds = computeCanvasSize(netlist.components.length);
  
  return { components, wires, bounds };
}
