import { Box, VStack, Divider } from '@chakra-ui/react';
import type { Submission, Netlist } from '@/types';
import { UploadForm, SubmissionList, NetlistInfo, ValidationResults } from '../organisms';

interface SidebarProps {
  submissions: Submission[];
  selectedId: string | null;
  selectedNetlist: Netlist | null;
  validationErrors: Array<{ rule: string; message: string; severity: 'error' | 'warning' }>;
  isLoading: boolean;
  onUploadSuccess: (id: string) => void;
  onSelect: (id: string) => void;
}

export function Sidebar({
  submissions,
  selectedId,
  selectedNetlist,
  validationErrors,
  isLoading,
  onUploadSuccess,
  onSelect,
}: SidebarProps) {
  return (
    <Box
      as="aside"
      w={{ base: 'full', lg: '340px' }}
      minW={{ lg: '340px' }}
      h={{ base: 'auto', lg: 'full' }}
      bg="white"
      borderRight={{ lg: '1px solid' }}
      borderColor="gray.200"
      overflowY="auto"
    >
      <VStack align="stretch" spacing={6} p={5}>
        <UploadForm onUploadSuccess={onUploadSuccess} />
        
        <Divider />
        
        <SubmissionList
          submissions={submissions}
          selectedId={selectedId}
          isLoading={isLoading}
          onSelect={onSelect}
        />
        
        {selectedNetlist && (
          <>
            <Divider />
            <NetlistInfo netlist={selectedNetlist} />
            <ValidationResults errors={validationErrors} />
          </>
        )}
      </VStack>
    </Box>
  );
}
