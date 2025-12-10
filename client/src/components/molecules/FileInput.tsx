import { useRef } from 'react';
import {
  Button,
  Input,
  HStack,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { FiUpload, FiFile } from 'react-icons/fi';

interface FileInputProps {
  accept: string;
  fileName: string | null;
  isLoading: boolean;
  error: string | null;
  onFileSelect: (file: File) => void;
}

export function FileInput({
  accept,
  fileName,
  isLoading,
  error,
  onFileSelect,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <VStack align="stretch" spacing={2}>
      <Input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        display="none"
      />
      
      <Button
        leftIcon={<Icon as={FiUpload} />}
        onClick={handleClick}
        isLoading={isLoading}
        loadingText="Uploading..."
        size="md"
        w="full"
      >
        Choose File
      </Button>

      {fileName && (
        <HStack spacing={2} color="gray.600" fontSize="sm">
          <Icon as={FiFile} />
          <Text noOfLines={1}>{fileName}</Text>
        </HStack>
      )}

      {error && (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      )}
    </VStack>
  );
}
