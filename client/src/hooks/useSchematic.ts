import { useMemo } from 'react';
import type { Netlist, SchematicData } from '@/types';
import { buildSchematic } from '@/utils';
import { CANVAS } from '@/constants';

const EMPTY_DATA: SchematicData = {
  components: [],
  wires: [],
  bounds: CANVAS,
};

export function useSchematic(netlist: Netlist | null): SchematicData {
  return useMemo(() => {
    if (!netlist) return EMPTY_DATA;
    return buildSchematic(netlist);
  }, [netlist]);
}
