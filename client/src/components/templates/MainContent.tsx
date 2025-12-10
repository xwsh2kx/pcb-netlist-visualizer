import { Box } from '@chakra-ui/react';
import type { SchematicData } from '@/types';
import { SchematicCanvas } from '../organisms';

interface MainContentProps {
  schematicData: SchematicData | null;
}

export function MainContent({ schematicData }: MainContentProps) {
  return (
    <Box
      as="main"
      flex={1}
      h="full"
      p={5}
      bg="gray.50"
      overflow="hidden"
    >
      <SchematicCanvas data={schematicData} />
    </Box>
  );
}
