import Elysia from "elysia";
import { WorkerController } from "../controllers/WorkerController";
import { errorHandler } from "../infra/handlers/errorHandler";

export const WorkerRoute = new Elysia().group("workers", (app) =>
    app.use(WorkerController)
).onError(({error, code, set})=>errorHandler(error, code, set));
