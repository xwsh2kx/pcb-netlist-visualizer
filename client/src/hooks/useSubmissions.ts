import { useState, useEffect, useCallback } from 'react';
import type { Submission } from '@/types';
import { fetchSubmissions, fetchSubmission, setUserId } from '@/api';

interface UseSubmissionsReturn {
  submissions: Submission[];
  selected: Submission | null;
  selectedId: string | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  select: (id: string) => Promise<void>;
  clear: () => void;
}

export function useSubmissions(userId: string): UseSubmissionsReturn {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUserId(userId);
  }, [userId]);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchSubmissions();
      setSubmissions(data);
    } catch (e) {
      setError('Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const select = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchSubmission(id);
      setSelected(data);
      setSelectedId(id);
    } catch (e) {
      setError('Failed to load submission');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setSelected(null);
    setSelectedId(null);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    submissions,
    selected,
    selectedId,
    isLoading,
    error,
    refresh,
    select,
    clear,
  };
}
