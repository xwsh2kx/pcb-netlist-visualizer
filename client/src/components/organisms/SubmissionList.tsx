import { VStack, Spinner, Center } from '@chakra-ui/react';
import type { Submission } from '@/types';
import { SubmissionCard } from '../molecules';
import { SectionHeader, EmptyState } from '../atoms';

interface SubmissionListProps {
  submissions: Submission[];
  selectedId: string | null;
  isLoading: boolean;
  onSelect: (id: string) => void;
}

export function SubmissionList({
  submissions,
  selectedId,
  isLoading,
  onSelect,
}: SubmissionListProps) {
  if (isLoading && submissions.length === 0) {
    return (
      <Center py={10}>
        <Spinner color="brand.500" />
      </Center>
    );
  }

  return (
    <VStack align="stretch" spacing={3}>
      <SectionHeader>Your Submissions</SectionHeader>
      
      {submissions.length === 0 ? (
        <EmptyState
          variant="no-data"
          title="No submissions yet"
          description="Upload a netlist JSON file to get started"
        />
      ) : (
        <VStack align="stretch" spacing={2}>
          {submissions.map(submission => (
            <SubmissionCard
              key={submission._id}
              submission={submission}
              isSelected={submission._id === selectedId}
              onClick={() => onSelect(submission._id)}
            />
          ))}
        </VStack>
      )}
    </VStack>
  );
}
