import Elysia from "elysia";
import { LogController } from "../controllers/LogController";
import { errorHandler } from "../infra/handlers/errorHandler";

export const LogRoute = new Elysia().group("logs", (app) =>
    app.use(LogController)
).onError(({error, code,set})=>errorHandler(error, code, set));
