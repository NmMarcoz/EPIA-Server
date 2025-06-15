import Elysia from "elysia";
import { validator } from "../infra/utils/validator";
import { createLogRequest } from "../infra/types/SchemaRequestTypes";
import * as logService from "../services/LogService";
import { Log } from "../infra/schemas/LogSchema";
import { HttpException } from "../infra/customErrors/HttpException";
import axios from "axios";

export const LogController = new Elysia()
    .post("/", async ({ set, body }) => {
        const log = validator(createLogRequest, body) as Log;
        const result = await logService.CreateLog(log);
        set.status = 200;
        // const response  = await axios.get("https://httpbin.org/ip");
        return result;
    })
    .post("/lot", async({set, body})=>{
        if(!Array.isArray(body)) throw new HttpException("body deve ser um array", 400);
        console.log("body", body);
        for(const log of body){
            console.log("body", log);
            await validator(createLogRequest, log);
        }
        const result = await logService.saveLot(body);
        // body.forEach(async(log)=>{
        //     await validator(createLogRequest, log);
        //     await logService.CreateLog(log)
        // }) 
        return{
            message:"logs criados"
        }
    })
    .get("/", async ({ set }) => {
        const logs = await logService.getAllLogs();
        return logs;
    })
    .get("/:id", async ({ set, params }) => {
        if (!params.id) throw new HttpException("id é obrigatório", 400);
        const log = await logService.getLogById(params.id);
        return log;
    })
    .delete("/", async({set})=>{
        const result = await logService.deleteAll();
        set.status = 204;
        return result;
    })
