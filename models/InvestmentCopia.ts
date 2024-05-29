import mongoose, { Schema, Document } from 'mongoose';

export interface InvestmentsCopia extends Document {
  id: Schema.Types.Number;
  amount: Schema.Types.Number;
  transaction_id: string;
  wallet: string;
  project_id: Schema.Types.Number;
  user_id: Schema.Types.Number;
  created_at: Date;
  updated_at: Date;
  status: string;
  vesting: Schema.Types.Number;
  telegram_discord: string;
}

const InvestmentCopiaSchema = new Schema<InvestmentsCopia>({
  id: { type: Schema.Types.Number, required: false },
  amount: { type: Schema.Types.Number, required: false },
  transaction_id: { type: String, required: false },
  wallet: { type: String, required: false },
  project_id: { type: Schema.Types.Number, required: false },
  user_id: { type: Schema.Types.Number, required: false },
  created_at: { type: Date, required: false },
  updated_at: { type: Date, required: false },
  status: { type: String, required: false },
  vesting: { type: Schema.Types.Number, required: false },
  telegram_discord: { type: String, required: false },
});

export default mongoose.models.InvestmentCopia ||
  mongoose.model<InvestmentsCopia>("InvestmentCopia", InvestmentCopiaSchema, 'investmentscopia');