import mongoose, { Schema, Document } from 'mongoose';

export interface Users extends Document {
  id: Schema.Types.Number;
  password: string;
  last_login: Date;
  is_superuser: Schema.Types.Number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: Schema.Types.Number;
  is_active: Schema.Types.Number;
  date_joined: Date;
  telegram_discord: string;
  group: string;
  is_verified: Schema.Types.Number;
}

const UserSchema = new Schema<Users>({
  id: { type: Schema.Types.Number, required: false },
  password: { type: String, required: false },
  last_login: { type: Date, required: false },
  is_superuser: { type: Schema.Types.Number, required: false },
  username: { type: String, required: false },
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  email: { type: String, required: false },
  is_staff: { type: Schema.Types.Number, required: false },
  is_active: { type: Schema.Types.Number, required: false },
  date_joined: { type: Date, required: false },
  telegram_discord: { type: String, required: false },
  group: { type: String, required: false },
  is_verified: { type: Schema.Types.Number, required: false },
});

export default mongoose.models.UserCopia ||
  mongoose.model<Users>("UserCopia", UserSchema, 'userscopia');