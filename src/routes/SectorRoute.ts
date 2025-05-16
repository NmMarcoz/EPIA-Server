import { Elysia } from "elysia";
import { SectorController } from "../controllers/SectorController";
import { SQLiteError } from "bun:sqlite";
import { errorHandler } from "../infra/handlers/errorHandler";

export const SectorRoute = new Elysia().group("/sectors", (app) =>
    app.use(SectorController)
        .onError(({ error, code, set }) => errorHandler(error, code, set))
);
