import {Schema, InferSchemaType, model} from 'mongoose';

export const OrganizationSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: false},
  address: { type: String, required: false },
  paymentPlanId: {type: Schema.ObjectId, required:true, ref:"PaymentPlan"}
})