import Elysia from "elysia";
import { AdminController } from "../controllers/AdminController";
import { errorHandler } from "../infra/handlers/errorHandler";

export const AdminRoute = new Elysia().group("admins", (app) =>
    app.use(AdminController)
).onError(({error, code, set})=>errorHandler(error, code, set));
