import { Box, VStack, HStack, Text, Icon } from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';
import type { ValidationError } from '@/types';
import { ValidationItem } from '../molecules';
import { SectionHeader } from '../atoms';

interface ValidationResultsProps {
  errors: ValidationError[];
}

export function ValidationResults({ errors }: ValidationResultsProps) {
  const errorCount = errors.filter(e => e.severity === 'error').length;
  const warningCount = errors.filter(e => e.severity === 'warning').length;

  return (
    <Box>
      <SectionHeader>Validation Results</SectionHeader>
      
      {errors.length === 0 ? (
        <HStack
          spacing={2}
          p={3}
          bg="green.50"
          color="green.700"
          borderRadius="md"
        >
          <Icon as={FiCheckCircle} />
          <Text fontSize="sm" fontWeight="medium">
            All validation checks passed
          </Text>
        </HStack>
      ) : (
        <VStack align="stretch" spacing={2}>
          <HStack spacing={4} fontSize="sm" color="gray.600" mb={1}>
            {errorCount > 0 && (
              <Text>
                <Text as="span" fontWeight="bold" color="red.600">
                  {errorCount}
                </Text>{' '}
                error{errorCount !== 1 ? 's' : ''}
              </Text>
            )}
            {warningCount > 0 && (
              <Text>
                <Text as="span" fontWeight="bold" color="orange.500">
                  {warningCount}
                </Text>{' '}
                warning{warningCount !== 1 ? 's' : ''}
              </Text>
            )}
          </HStack>
          
          {errors.map((error, index) => (
            <ValidationItem key={index} error={error} />
          ))}
        </VStack>
      )}
    </Box>
  );
}
