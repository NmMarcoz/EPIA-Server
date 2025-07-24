import {Schema, InferSchemaType, model} from 'mongoose';

export const ConfigSchema = new Schema({
  name: {type: String, required:true},
  logsMonthLimit: {type: Number, required:true},
  logsRetentionPeriod: {type: Number, required:true},
  //cada um desses vai ser consumido por processamento de log/notificação
  proccessTokens: {type: Number, required:true}
})