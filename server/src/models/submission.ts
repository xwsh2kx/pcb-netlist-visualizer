import mongoose, { Schema, Document } from 'mongoose';
import type { Netlist, ValidationError } from '../types';

export interface ISubmission extends Document {
  userId: string;
  netlist: Netlist;
  validationErrors: ValidationError[];
  createdAt: Date;
  updatedAt: Date;
}

const NodeSchema = new Schema({
  ref: { type: String, required: true },
  pin: { type: String, required: true },
  pinFunction: String,
  pinType: String,
}, { _id: false });

const NetSchema = new Schema({
  code: { type: Number, required: true },
  name: { type: String, required: true },
  nodes: [NodeSchema],
}, { _id: false });

const ComponentSchema = new Schema({
  ref: { type: String, required: true },
  value: { type: String, required: true },
  footprint: String,
  library: String,
  part: String,
  description: String,
}, { _id: false });

const DesignSchema = new Schema({
  source: String,
  date: String,
  tool: String,
  title: String,
}, { _id: false });

const NetlistSchema = new Schema({
  version: String,
  design: DesignSchema,
  components: [ComponentSchema],
  nets: [NetSchema],
}, { _id: false });

const ValidationErrorSchema = new Schema({
  rule: { type: String, required: true },
  message: { type: String, required: true },
  severity: { type: String, enum: ['error', 'warning'], required: true },
}, { _id: false });

const SubmissionSchema = new Schema<ISubmission>({
  userId: { type: String, required: true, index: true },
  netlist: { type: NetlistSchema, required: true },
  validationErrors: [ValidationErrorSchema],
}, {
  timestamps: true,
});

export const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);
