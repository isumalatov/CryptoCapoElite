import mongoose from "mongoose";
import { Users } from "./User";
import { Presales } from "./Presale";

export interface Investments extends mongoose.Document {
  user: Users;
  presale: Presales;
  amount: number;
  txid: string;
  wallet: string;
  state: string;
}

const InvestmentSchema = new mongoose.Schema<Investments>({
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  presale: {
    id: { type: String, required: true },
    title: { type: String, required: true },
  },
  amount: { type: Number, required: true },
  txid: { type: String, required: true },
  wallet: { type: String, required: true },
  state: { type: String, required: true },
});

export default mongoose.models.Investment ||
  mongoose.model<Investments>("Investment", InvestmentSchema);
