import mongoose from "mongoose";
import { Users } from "./User"; // Import the 'User' interface from the appropriate module

export interface Feedbacks extends Document {
    user: Users;
    score: number;
    opinion: string;
}

const FeedbackSchema = new mongoose.Schema<Feedbacks>({
    user: { 
        id: { type: String, required: true },
        name: { type: String, required: true },
    },
    score: { type: Number, required: true },
    opinion: { type: String, required: true },
});

export default mongoose.models.Feedback || mongoose.model<Feedbacks>("Feedback", FeedbackSchema);