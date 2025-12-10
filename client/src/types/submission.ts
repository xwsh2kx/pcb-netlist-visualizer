import type { Netlist } from './netlist';

export interface ValidationError {
  rule: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface Submission {
  _id: string;
  userId: string;
  netlist: Netlist;
  validationErrors: ValidationError[];
  createdAt: string;
  updatedAt?: string;
}

export interface UploadResponse {
  id: string;
  validationErrors: ValidationError[];
}
