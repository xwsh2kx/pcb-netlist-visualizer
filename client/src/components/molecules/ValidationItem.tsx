import { HStack, Text, Icon } from '@chakra-ui/react';
import { FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';
import type { ValidationError } from '@/types';

interface ValidationItemProps {
  error: ValidationError;
}

export function ValidationItem({ error }: ValidationItemProps) {
  const isError = error.severity === 'error';
  
  return (
    <HStack
      spacing={2}
      p={2}
      borderRadius="md"
      bg={isError ? 'red.50' : 'orange.50'}
      color={isError ? 'red.700' : 'orange.700'}
    >
      <Icon as={isError ? FiAlertCircle : FiAlertTriangle} flexShrink={0} />
      <Text fontSize="sm">{error.message}</Text>
    </HStack>
  );
}
