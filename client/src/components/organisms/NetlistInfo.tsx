import { Box, VStack, HStack, Text, Divider, Badge } from '@chakra-ui/react';
import type { Netlist } from '@/types';
import { SectionHeader } from '../atoms';

interface NetlistInfoProps {
  netlist: Netlist;
}

export function NetlistInfo({ netlist }: NetlistInfoProps) {
  const { design, components, nets } = netlist;

  return (
    <Box>
      <SectionHeader>Circuit Info</SectionHeader>
      
      <VStack align="stretch" spacing={3} fontSize="sm">
        {design?.title && (
          <Box>
            <Text color="gray.500" fontSize="xs" mb={1}>
              Title
            </Text>
            <Text fontWeight="medium">{design.title}</Text>
          </Box>
        )}
        
        <HStack spacing={4}>
          <Box flex={1}>
            <Text color="gray.500" fontSize="xs" mb={1}>
              Components
            </Text>
            <Badge colorScheme="blue" fontSize="sm">
              {components.length}
            </Badge>
          </Box>
          
          <Box flex={1}>
            <Text color="gray.500" fontSize="xs" mb={1}>
              Nets
            </Text>
            <Badge colorScheme="purple" fontSize="sm">
              {nets.length}
            </Badge>
          </Box>
        </HStack>
        
        {design?.tool && (
          <>
            <Divider />
            <HStack justify="space-between" color="gray.500" fontSize="xs">
              <Text>Source: {design.tool}</Text>
              {design.date && <Text>{design.date}</Text>}
            </HStack>
          </>
        )}
      </VStack>
    </Box>
  );
}
