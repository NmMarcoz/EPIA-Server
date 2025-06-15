import Elysia from "elysia";
import * as userSessionService from "../services/UserSessionService";
import { HttpException } from "../infra/customErrors/HttpException";
import { UserSessionType } from "../infra/schemas/UserSession";

export const UserSessionController = new Elysia()

    .get("/", async () => {
        return await userSessionService.getUserSession();
    })

    .get("/:cardId", async ({ params }) => {
        if (!params.cardId) throw new HttpException("cardId é obrigatório", 400);
        const session = await userSessionService.getUserSessionById(params.cardId);
        if (!session) throw new HttpException("Sessão não encontrada", 404);
        return session;
    })
    // POST /usersessions - cria nova sessão
    .post("/", async ({ body }) => {
       
        return await userSessionService.newSession(body as UserSessionType);
    })
    // PUT /usersessions/:cardId - atualiza sessão
    .put("/:id", async ({ params, body }) => {
        console.log("params", params)
        if (!params.id  ) throw new HttpException("cardId é obrigatório", 400);
        console.log("body")
        const result =await userSessionService.updateUserSession(params.id, body.allCorrects);
        return {result}
    })
    // DELETE /usersessions - deleta todas as sessões
    .delete("/", async () => {
        return await userSessionService.deleteSessions();
    });