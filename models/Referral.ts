import mongoose from "mongoose";
import { Users } from "./User";
import { Investments } from "./Investment";

export interface Referrals extends mongoose.Document {
  user: Users;
  investment: Investments;
  amount: number;
  wallet: string;
}

const ReferralSchema = new mongoose.Schema<Referrals>({
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  investment: {
    id: { type: String, required: true },
  },
  amount: { type: Number, required: true },
  wallet: { type: String, required: true },
});

export default mongoose.models.Referral ||
  mongoose.model<Referrals>("Referral", ReferralSchema);
