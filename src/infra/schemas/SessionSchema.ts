import { Schema, InferSchemaType, model } from "mongoose";

export const SessionSchema = new Schema(
    {
        cardId: { type: String, required: true, index: true },
    },
    {
        timestamps: true,
        methods: {
            getBaseAttributes() {
                return {
                    cardID: this.cardId,
                };
            },
        },
    }
);

export type Session = InferSchemaType<typeof SessionSchema>;
export const Session = model("Session", SessionSchema);
