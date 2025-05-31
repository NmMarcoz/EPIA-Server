import { type } from "arktype";


export const CreateUserRequest = type({
    name: "string",
    birthdate: "string.date",
    email: "string.email",
    password: "string",
    phone: "string"
})

export const CreateStoreRequest = type({
    name: "string",
    address: "string",
    cep: "string.numeric == 8",
    //store_id: "number.integer"
})

