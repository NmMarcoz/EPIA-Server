import { Schema, InferSchemaType, model } from "mongoose";

export const AdminSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        function: { type: String, required: true },
        cardId: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
        methods: {
            getBaseAttributes() {
                return{
                    id: this._id,
                    name: this.name,
                    function: this.function,
                    cadId: this.cardId,
                    password: this.password
                }
            },
        },
    }
);


export type Admin = InferSchemaType<typeof AdminSchema>;

export const Admin = model("Admin", AdminSchema);
