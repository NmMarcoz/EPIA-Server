import { type } from "arktype";
import { ValidationException } from "../customErrors/ValidationException";

export const validator = (schema: type, body:any) => {
    if(!body){
        throw new ValidationException({
            summary: "Invalid body",
            details: {schema: schema.description}
        })
    }
    const out = schema(body);
    if (out instanceof type.errors) {
        throw new ValidationException({
            summary: out.summary,
            details: {schema: schema.description}
        })
    }
    return out as typeof schema.infer
}