import { Box, useToast } from '@chakra-ui/react';
import { FileInput } from '../molecules';
import { SectionHeader } from '../atoms';
import { useUpload } from '@/hooks';

interface UploadFormProps {
  onUploadSuccess: (id: string) => void;
}

export function UploadForm({ onUploadSuccess }: UploadFormProps) {
  const { fileName, isUploading, error, upload, reset } = useUpload();
  const toast = useToast();

  const handleFileSelect = async (file: File) => {
    const response = await upload(file);
    
    if (response) {
      const hasErrors = response.validationErrors.length > 0;
      
      toast({
        title: 'Netlist uploaded',
        description: hasErrors
          ? `Found ${response.validationErrors.length} validation issue(s)`
          : 'All validation checks passed',
        status: hasErrors ? 'warning' : 'success',
        duration: 4000,
        isClosable: true,
        position: 'top'
      });
      
      onUploadSuccess(response.id);
      reset();
    }
  };

  return (
    <Box>
      <SectionHeader>Upload Netlist</SectionHeader>
      <FileInput
        accept=".json"
        fileName={fileName}
        isLoading={isUploading}
        error={error}
        onFileSelect={handleFileSelect}
      />
    </Box>
  );
}
