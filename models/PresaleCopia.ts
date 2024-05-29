import mongoose, { Schema, Document } from 'mongoose';

export interface PresalesCopia extends Document {
  id: Schema.Types.Number;
  header_image: string;
  title: string;
  description: string;
  project_status: string;
  url: string;
  round: string;
  buy_price: Schema.Types.Number;
  collected: Schema.Types.Number;
  objective: Schema.Types.Number;
  maximum_inversion: Schema.Types.Number;
  minimum_inversion: Schema.Types.Number;
  vesting_description: string;
  vesting_fee: Schema.Types.Number;
  vesting_percentage: Schema.Types.Number;
  vesting_starting_at: string;
  address: string;
  network: string;
}

const PresaleCopiaSchema = new Schema<PresalesCopia>({
  id: { type: Schema.Types.Number, required: false },
  header_image: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  project_status: { type: String, required: false },
  url: { type: String, required: false },
  round: { type: String, required: false },
  buy_price: { type: Schema.Types.Number, required: false },
  collected: { type: Schema.Types.Number, required: false },
  objective: { type: Schema.Types.Number, required: false },
  maximum_inversion: { type: Schema.Types.Number, required: false },
  minimum_inversion: { type: Schema.Types.Number, required: false },
  vesting_description: { type: String, required: false },
  vesting_fee: { type: Schema.Types.Number, required: false },
  vesting_percentage: { type: Schema.Types.Number, required: false },
  vesting_starting_at: { type: String, required: false },
  address: { type: String, required: false },
  network: { type: String, required: false },
});

export default mongoose.models.PresaleCopia ||
  mongoose.model<PresalesCopia>("PresaleCopia", PresaleCopiaSchema, 'presalescopia');