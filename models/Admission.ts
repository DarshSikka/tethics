// Contains database model and interface for handling Student Admissions

import * as mongoose from "mongoose";
import { Schema } from "mongoose";
export interface Student {
  name: string;
  email: string;
  phone: string;
  grade: string;
}
const schema: Schema = new Schema<Student>({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
});
export const Admission = mongoose.model<Student>(
  "Admission",
  schema,
  "admissions"
);
