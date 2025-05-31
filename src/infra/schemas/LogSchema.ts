import { Schema, InferSchemaType, model } from "mongoose";

export const LogSchema = new Schema(
    {
        worker: { type: Schema.ObjectId, ref: "Worker", required: true },
        sector: { type: Schema.ObjectId, ref: "Sector", required: true },
        removedEpi: { type: Array<String>, required: true },
        remotionHour: { type: String, required: true },
        allEpiCorrects: { type: Boolean, required: true },
    },
    {
        timestamps: true,
        methods: {
            getBaseAttributes() {
                return {
                    worker: this.worker,
                    sector: this.sector,
                    removedEpi: this.removedEpi,
                    remotionHour: this.remotionHour,
                    allEpiCorrects: this.allEpiCorrects,
                };
            },
        },
    }
);

export type Log = InferSchemaType<typeof LogSchema>;

export const Log = model("Log", LogSchema);
