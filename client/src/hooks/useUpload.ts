import { useState, useCallback } from 'react';
import type { Netlist, UploadResponse } from '@/types';
import { uploadNetlist } from '@/api';

interface UseUploadReturn {
  fileName: string | null;
  isUploading: boolean;
  error: string | null;
  upload: (file: File) => Promise<UploadResponse | null>;
  reset: () => void;
}

export function useUpload(): UseUploadReturn {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File): Promise<UploadResponse | null> => {
    setFileName(file.name);
    setError(null);
    setIsUploading(true);

    try {
      const text = await file.text();
      const netlist = JSON.parse(text) as Netlist;
      const response = await uploadNetlist(netlist);
      return response;
    } catch (e) {
      const message = e instanceof SyntaxError
        ? 'Invalid JSON format'
        : 'Upload failed';
      setError(message);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setFileName(null);
    setError(null);
    setIsUploading(false);
  }, []);

  return { fileName, isUploading, error, upload, reset };
}
