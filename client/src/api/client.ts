import axios from 'axios';
import type { Netlist, Submission, UploadResponse } from '@/types';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

export function setUserId(userId: string): void {
  client.defaults.headers.common['x-user-id'] = userId;
}

export async function uploadNetlist(netlist: Netlist): Promise<UploadResponse> {
  const { data } = await client.post('/netlists', { netlist });
  return data;
}

export async function fetchSubmissions(): Promise<Submission[]> {
  const { data } = await client.get('/netlists');
  return data;
}

export async function fetchSubmission(id: string): Promise<Submission> {
  const { data } = await client.get(`/netlists/${id}`);
  return data;
}

export async function deleteSubmission(id: string): Promise<void> {
  await client.delete(`/netlists/${id}`);
}
