import { Box } from '@chakra-ui/react';
import type { SchematicData } from '@/types';
import { SvgDefs, SvgComponent, SvgWire } from '../molecules';
import { EmptyState } from '../atoms';

interface SchematicCanvasProps {
  data: SchematicData | null;
}

export function SchematicCanvas({ data }: SchematicCanvasProps) {
  if (!data || data.components.length === 0) {
    return (
      <Box
        h="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
        borderRadius="lg"
      >
        <EmptyState
          variant="no-selection"
          title="No schematic to display"
          description="Select a submission from the list or upload a new netlist"
        />
      </Box>
    );
  }

  const { components, wires, bounds } = data;

  return (
    <Box
      w="full"
      h="full"
      overflow="auto"
      bg="schematic.background"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
    >
      <svg
        width={bounds.width}
        height={bounds.height}
        viewBox={`0 0 ${bounds.width} ${bounds.height}`}
        style={{ minWidth: bounds.width, minHeight: bounds.height }}
      >
        <SvgDefs />
        
        <rect
          width={bounds.width}
          height={bounds.height}
          fill="url(#grid)"
        />
        
        <g className="wires">
          {wires.map((wire, index) => (
            <SvgWire key={`${wire.netName}-${index}`} wire={wire} />
          ))}
        </g>
        
        <g className="components">
          {components.map(component => (
            <SvgComponent key={component.ref} component={component} />
          ))}
        </g>
      </svg>
    </Box>
  );
}
