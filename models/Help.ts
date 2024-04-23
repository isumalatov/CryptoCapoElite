import mongoose from "mongoose";
import { Users } from "./User"; // Import the 'User' interface from the appropriate module

export interface Helps extends Document {
  user: Users;
  opinion: string;
}

const HelpSchema = new mongoose.Schema<Helps>({
  user: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  opinion: { type: String, required: true },
});

export default mongoose.models.Help ||
  mongoose.model<Helps>("Help", HelpSchema);
