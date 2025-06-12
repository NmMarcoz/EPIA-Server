import { type } from "arktype";
export const CreateSectorRequest = type({
    code: "string",
    name: "string",
    rules: "string[]"
})

export const UpdateSectorRequest = type({
    code: "string | null",
    name: "string | null",
    rules: "string[] | null"
}).partial();

export const createWorkerRequest = type({
    name: "string",
    registrationNumber: "string == 4",
    email: "string.email",
    function: "string",
    cardId: "string"
})

export const updateWorkerRequest = type({
    name: "string",
    email: "string.email",
    function: "string",
    cardId: "string"
}).partial()


export const createAdminRequest = type({
    name: "string",
    email: "string.email",
    function: "string",
    cardId: "string",
    password: "string >= 8"
})

export const updateAdminRequest = type({
    name: "string",
    email: "string.email",
    function: "string",
    cardId: "string",
}).partial()

export const createLogRequest = type({
    worker: "string",
    sector: "string",
    detectedEpi: "string[] | null",
    removedEpi: "string[] | null",
    remotionHour: "string",
    allEpiCorrects: "boolean"
})