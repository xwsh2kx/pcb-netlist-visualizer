import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import type { Submission } from '@/types';
import { formatDate } from '@/utils';
import { StatusBadge } from '../atoms';

interface SubmissionCardProps {
  submission: Submission;
  isSelected: boolean;
  onClick: () => void;
}

export function SubmissionCard({ submission, isSelected, onClick }: SubmissionCardProps) {
  const title = submission.netlist.design?.title
    || `Netlist (${submission.netlist.components.length} components)`;
  
  const isValid = submission.validationErrors.length === 0;

  return (
    <Box
      as="button"
      w="full"
      p={3}
      borderRadius="md"
      border="2px solid"
      borderColor={isSelected ? 'brand.500' : 'gray.200'}
      bg={isSelected ? 'brand.50' : 'white'}
      textAlign="left"
      transition="all 0.2s"
      _hover={{
        borderColor: isSelected ? 'brand.500' : 'gray.300',
        bg: isSelected ? 'brand.50' : 'gray.50',
      }}
      onClick={onClick}
    >
      <VStack align="stretch" spacing={1}>
        <Text fontWeight="medium" color="gray.800" noOfLines={1}>
          {title}
        </Text>
        
        <HStack justify="space-between">
          <Text fontSize="xs" color="gray.500">
            {formatDate(submission.createdAt)}
          </Text>
          <StatusBadge
            isValid={isValid}
            errorCount={submission.validationErrors.length}
            fontSize="xs"
          />
        </HStack>
      </VStack>
    </Box>
  );
}
