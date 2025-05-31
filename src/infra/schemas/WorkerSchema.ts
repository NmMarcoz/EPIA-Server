import {Schema, InferSchemaType, model} from "mongoose";

export const WorkerSchema = new Schema({
    name: {type: String, required: true},
    registrationNumber:{type:String, required:true, length:4, unique: true},
    email: {type: String, required:true},
    function: {type:String, required:true},
    cardId: {type:String, required:true}
},{
    timestamps:true,
    methods:{
        getBaseAttributes(){
            return{
                id: this._id,
                name: this.name,
                registrationNumber: this.registrationNumber,
                email: this.email,
                function: this.function,
                cardId: this.cardId
            }
        }
    }
})


export type Worker = InferSchemaType<typeof WorkerSchema>

export const Worker = model("Worker", WorkerSchema);

