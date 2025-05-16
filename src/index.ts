import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { SectorRoute } from "./routes/SectorRoute";
import { StoreRoute } from "./routes/StoreRoute";
import "dotenv/config"
import * as mongoose from "mongoose";

await mongoose.connect(process.env.DATABASE_URL!);

const app = new Elysia()
    .get("/", () => "Hello Elysia")
    .use(SectorRoute)
    .use(swagger())
    .listen(3000);


console.info(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
