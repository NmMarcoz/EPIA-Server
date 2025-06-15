import Elysia from "elysia";
import { NotificationsController } from "../controllers/NotificationsController";
import { errorHandler } from "../infra/handlers/errorHandler";

export const NotificationRoute = new Elysia().group("/notifications", (app) =>
    app.use(NotificationsController)
        .onError(({ error, code, set }) => errorHandler(error, code, set))
);
