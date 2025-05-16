import { SQLiteError } from "bun:sqlite";
import { ValidationException } from "../customErrors/ValidationException";
import { HttpException } from "../customErrors/HttpException";
import { MongoError } from "mongodb";

export const errorHandler = (error, code, set) => {
    console.error("ERROR ON ELYSIA CATCH", error);
    set.status = 500;
    if (code === "INTERNAL_SERVER_ERROR") {
        console.error("INTERNAL ERROR");
        return {
            message: "erro interno de servidor",
            reason: {
                summary: error.cause ?? "Desconhecido",
                details: error.stack,
            },
        };
    }
    if (error instanceof SQLiteError) {
        set.status = 500;
        return {
            message: "Erro ao salvar dados no banco",
            reason: {
                summary: error.message,
                details: error.cause ?? "no details",
            },
        };
    }

    if (error instanceof ReferenceError) {
        console.error("REFERENCE ERROR");
        set.status = 500;
        return {
            message: "Erro interno de servidor, entre em contato",
            reason: { summary: error.cause },
        };
    }
    if (error instanceof ValidationException) {
        console.error("VALIDATION ERROR");
        set.status = 400;
        return {
            message: error.message,
            reason: error.reason,
        };
    }
    if (error instanceof HttpException) {
        console.error("HTTPEXCEPTION");
        set.status = error.statusCode;
        return {
            message: error.message,
        };
    }
    if (error instanceof MongoError) {
        console.log("MONGO ERROR", error.code);
        if (error.code === 11000) {
            set.status = 400;
            return {
                message: `Erro no cadastro, já existe uma entidade vinculada a esta chave`,
                reason: { summary: error.errmsg, details: null },
            };
        }
        set.status = 500;
        return {
            message: "Erro desconhecido ao operar o banco de dados",
            reason: { summary: error.errmsg, details: null },
        };
    }
    set.status = 500;
    return {
        message: "Erro desconhecido",
        reason: { summary: error?.message ?? "Internal error" },
    };
};
