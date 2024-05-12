import mongoose from "mongoose";
import { Users } from "./User";

export interface Referrals extends mongoose.Document {
  user: Users;
  amount: number;
}

const ReferralSchema = new mongoose.Schema<Referrals>({
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  amount: { type: Number, required: true },
});

export default mongoose.models.Referral ||
  mongoose.model<Referrals>("Referral", ReferralSchema);
