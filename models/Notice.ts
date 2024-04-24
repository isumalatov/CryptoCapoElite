import mongoose from "mongoose";

export interface Notices extends mongoose.Document {
  title: string;
  content: string;
}

const NoticeSchema = new mongoose.Schema<Notices>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default mongoose.models.Notice || mongoose.model<Notices>("Notice", NoticeSchema);
