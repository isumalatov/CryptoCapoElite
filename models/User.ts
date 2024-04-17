import mongoose from "mongoose";

export interface Users extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    discord: string;
    telegram: string;
    allowemail: boolean;
}

const UserSchema = new mongoose.Schema<Users>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    discord: { type: String, required: false },
    telegram: { type: String, required: false },
    allowemail: { type: Boolean, required: true }
});

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);