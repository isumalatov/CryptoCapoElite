import mongoose from "mongoose";

export interface Presales extends mongoose.Document {
  title: string;
  description: string;
  state: string;
  round: string;
  price: string;
  min: string;
  max: string;
  vesting: string;
  url: string;
  urltelegram: string;
  urltwitter: string;
  urldocs: string;
}

const PresaleSchema = new mongoose.Schema<Presales>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  state: { type: String, required: false },
  round: { type: String, required: false },
  price: { type: String, required: false },
  min: { type: String, required: false },
  max: { type: String, required: false },
  vesting: { type: String, required: false },
  url: { type: String, required: false },
  urltelegram: { type: String, required: false },
  urltwitter: { type: String, required: false },
  urldocs: { type: String, required: false },
});

export default mongoose.models.Presale ||
  mongoose.model<Presales>("Presale", PresaleSchema);
