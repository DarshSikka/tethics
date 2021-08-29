import * as mongoose from "mongoose";
export interface notice {
  title: string;
  attachment: string;
  description: string;
}
const schema = new mongoose.Schema<notice>({
  title: {
    type: String,
    required: true,
  },
  attachment: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
export const Notice = mongoose.model<notice>("Notice", schema, "notices");
