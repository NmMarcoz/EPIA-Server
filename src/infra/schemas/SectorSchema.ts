import {Schema, InferSchemaType, model} from 'mongoose';

export const SectorSchema = new Schema({
        code: {type: String, required: true, unique: true, index:true},
        name: {type: String, required: true},
        rules: {type: Array<String>, required: true},

    },
    {
        methods:{
            getRules(){
                return this.rules;
            },
            getUserAvailableFields(){
                return{
                    name: this.name,
                    code: this.code,
                    rules: this.rules
                }
            }
        },
        timestamps: true
    }
)

export type Sector = InferSchemaType<typeof SectorSchema>
export const Sector = model('Sector', SectorSchema);