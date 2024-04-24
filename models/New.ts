import mongoose from "mongoose";

export interface News extends mongoose.Document {
  title: string;
  content: string;
}

const NewSchema = new mongoose.Schema<News>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default mongoose.models.New || mongoose.model<News>("New", NewSchema);
