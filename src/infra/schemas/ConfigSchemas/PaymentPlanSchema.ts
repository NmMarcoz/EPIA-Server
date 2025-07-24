import {Schema, InferSchemaType, model} from 'mongoose';

export const PaymentPlanSchema = new Schema({
  name: {type: String, required:true},
  basePrice: {type: Number, required:true},
  planConfigId: {type: Schema.ObjectId, required:true, ref:"Config"},
  personalizated: {type: Boolean, required:false, default: false}
})