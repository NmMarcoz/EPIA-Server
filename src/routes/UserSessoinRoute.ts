import Elysia from "elysia";
import { UserSessionController } from "../controllers/UserSessionController";
import { errorHandler } from "../infra/handlers/errorHandler";

export const UserSessionRoute = new Elysia().group("/usersessions", (app) =>
    app.use(UserSessionController).onError(({ error, code, set }) => errorHandler(error, code, set))
);
