import { type } from "arktype"
export const CreateSectorRequest = type({
    code: "string",
    name: "string",
    rules: "string[]"
})

export const UpdateSectorRequest = type({
    code: "string",
    name: "string",
    rules: "string[]"
}).partial();

