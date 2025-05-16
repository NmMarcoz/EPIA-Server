import Elysia from "elysia";
import { StoreController } from "../controllers/StoreController";
import { errorHandler } from "../infra/handlers/errorHandler";

export const StoreRoute = new Elysia().group("/stores", 
    (app) => app
        .use(StoreController)
        .onError(({ error, code, set }) => errorHandler(error, code, set))
);
