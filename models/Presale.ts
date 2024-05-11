import mongoose from "mongoose";

export interface Presales extends mongoose.Document {
  title: string;
  name: string;
  description: string;
  wallet : string;
  imagename: string;
  imageurl: string;
  state: string;
  round: string;
  price: number;
  min: number;
  max: number;
  vesting: string;
  tokenstandard: string;
  fees: number;
  url: string;
  urltelegram: string;
  urltwitter: string;
  urldocs: string;
}

const PresaleSchema = new mongoose.Schema<Presales>({
  title: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  wallet: { type: String, required: true },
  imagename: { type: String, required: true },
  imageurl: { type: String, required: true },
  state: { type: String, required: true },
  round: { type: String, required: true },
  price: { type: Number, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  vesting: { type: String, required: true },
  tokenstandard: { type: String, required: true },
  fees: { type: Number, required: true },
  url: { type: String, required: true },
  urltelegram: { type: String, required: true },
  urltwitter: { type: String, required: true },
  urldocs: { type: String, required: true },
});

export default mongoose.models.Presale ||
  mongoose.model<Presales>("Presale", PresaleSchema);
