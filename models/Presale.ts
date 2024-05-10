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
  description: { type: String, required: false },
  wallet: { type: String, required: false },
  imagename: { type: String, required: false },
  imageurl: { type: String, required: false },
  state: { type: String, required: false },
  round: { type: String, required: false },
  price: { type: Number, required: false },
  min: { type: Number, required: false },
  max: { type: Number, required: false },
  vesting: { type: String, required: false },
  tokenstandard: { type: String, required: false },
  fees: { type: Number, required: false },
  url: { type: String, required: false },
  urltelegram: { type: String, required: false },
  urltwitter: { type: String, required: false },
  urldocs: { type: String, required: false },
});

export default mongoose.models.Presale ||
  mongoose.model<Presales>("Presale", PresaleSchema);
