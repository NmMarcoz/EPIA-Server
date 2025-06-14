import Elysia from "elysia";
import * as sessionService from "../services/SessionService";

export const newSession = new Elysia().post("/", async ({ set, body }) => {
    const { cardId } = body as { cardId: string };
    if(!cardId){
        set.status = 400;
        return { message: "cardId é obrigatório" };
    }
    const response = await sessionService.newSession(cardId);
    set.status = 201;
    return response;
})
export const getSession = new Elysia().get("/", async ({ set, body }) => {
    const response = await sessionService.getSession();
    set.status = 201;
    return response;
})