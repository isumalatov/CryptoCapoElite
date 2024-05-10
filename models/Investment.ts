import mongoose from "mongoose";
import { Users } from "./User";
import { Presales } from "./Presale";

export interface Investments extends mongoose.Document {
  idUser: Users;
  idPresale: Presales;
  amount: number;
  tokens: number;
  txid: string;
  wallet: string;
  state: string;
}

const InvestmentSchema = new mongoose.Schema<Investments>({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  idPresale: { type: mongoose.Schema.Types.ObjectId, ref: 'Presales', required: true },
  amount: { type: Number, required: true },
  tokens: { type: Number, required: true },
  txid: { type: String, required: true },
  wallet: { type: String, required: true },
  state: { type: String, required: true },
});

export default mongoose.models.Investment ||
  mongoose.model<Investments>("Investment", InvestmentSchema);
