import {Schema, InferSchemaType, model} from 'mongoose';

export const NotificationSchema = new Schema({
    message: {type: String, required: true},
    summary: {type: String, required: true},
    type: {type: String, required: true, enum: ['tempoReal', 'credenciamento']},
    log: {type: Schema.Types.ObjectId, ref: 'Log', required: false},
    consumed: {type: Boolean, default: false},
},{
    timestamps: true,
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        },
    },
})
export type Notification = InferSchemaType<typeof NotificationSchema>;
export const Notification = model('Notification', NotificationSchema);