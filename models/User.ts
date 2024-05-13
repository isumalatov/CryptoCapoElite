import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  admin: boolean;
  name: string;
  email: string;
  password: string;
  discord: string;
  telegram: string;
  allowemailprev: boolean;
  allowemailcancel: boolean;
  allowemailnew: boolean;
  resetpasswordtoken: string;
  referral: Users;
}

const UserSchema = new mongoose.Schema<Users>({
  admin: { type: Boolean, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  discord: { type: String, required: false },
  telegram: { type: String, required: false },
  allowemailprev: { type: Boolean, required: true },
  allowemailcancel: { type: Boolean, required: true },
  allowemailnew: { type: Boolean, required: true },
  resetpasswordtoken: { type: String, required: false },
  referral: {
    id: { type: String, required: false },
    name: { type: String, required: false },
  },
});

export default mongoose.models.User ||
  mongoose.model<Users>("User", UserSchema);
