import { Box, Flex, Heading, Text, HStack, Icon } from '@chakra-ui/react';
import { FiCpu } from 'react-icons/fi';

interface HeaderProps {
  userId: string;
}

export function Header({ userId }: HeaderProps) {
  return (
    <Box
      as="header"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={6}
      py={4}
    >
      <Flex justify="space-between" align="center" maxW="1600px" mx="auto">
        <HStack spacing={3}>
          <Icon as={FiCpu} boxSize={6} color="brand.500" />
          <Heading as="h1" size="md" fontWeight="semibold">
            PCB Netlist Visualizer
          </Heading>
        </HStack>
        
        <HStack spacing={2} color="gray.500" fontSize="sm">
          <Text>User:</Text>
          <Text fontFamily="mono" color="gray.700">
            {userId}
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
}
