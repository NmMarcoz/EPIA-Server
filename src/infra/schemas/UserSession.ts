import { Schema, InferSchemaType, model } from "mongoose";

export const UserSessionSchema = new Schema(
    {
       allCorrects: { type: Boolean, required: true, default: false },
       cardId: { type: String, required: true },
    },
    {
        timestamps: true,
        methods: {
            getBaseAttributes() {
                return {
                  
                };
            },
        },
    }
);

export type UserSessionType = InferSchemaType<typeof UserSessionSchema>;

export const UserSessionModel = model("UserSession", UserSessionSchema);
