import Elysia from "elysia";
import { SessionController } from "../controllers/SessionController";
import { errorHandler } from "../infra/handlers/errorHandler";
export const SessionRoute = new Elysia().group("sessions", (app) =>
    app.use(SessionController)
).onError(({error, code, set})=>errorHandler(error, code, set));;
