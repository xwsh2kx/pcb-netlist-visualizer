import { VStack, Text, Icon } from '@chakra-ui/react';
import { FiInbox, FiUpload, FiFileText } from 'react-icons/fi';
import type { IconType } from 'react-icons';

type EmptyVariant = 'no-data' | 'no-selection' | 'upload';

interface EmptyStateProps {
  variant: EmptyVariant;
  title: string;
  description?: string;
}

const icons: Record<EmptyVariant, IconType> = {
  'no-data': FiInbox,
  'no-selection': FiFileText,
  'upload': FiUpload,
};

export function EmptyState({ variant, title, description }: EmptyStateProps) {
  return (
    <VStack spacing={3} py={10} color="gray.500">
      <Icon as={icons[variant]} boxSize={10} />
      <Text fontWeight="medium">{title}</Text>
      {description && (
        <Text fontSize="sm" textAlign="center" maxW="xs">
          {description}
        </Text>
      )}
    </VStack>
  );
}
