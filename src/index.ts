import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { SectorRoute } from "./routes/SectorRoute";
// import "dotenv/config"
import * as mongoose from "mongoose";
import { WorkerRoute } from "./routes/WorkerRoute";
import { AdminRoute } from "./routes/AdminRoute";
import { LogRoute } from "./routes/LogRoute";

await mongoose.connect(process.env.DATABASE_URL!);

const app = new Elysia()
    .get("/", () => "Hello Elysia")
    .use(SectorRoute)
    .use(WorkerRoute)
    .use(AdminRoute)
    .use(LogRoute)
    .use(swagger())
    .listen(3000);


console.info(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
