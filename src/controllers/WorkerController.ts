import Elysia from "elysia";
import { validator } from "../infra/utils/validator";
import { createWorkerRequest, updateWorkerRequest } from "../infra/types/SchemaRequestTypes";
import * as workerService from "../services/WorkerService";
import { Worker } from "../infra/schemas/WorkerSchema";
import { HttpException } from "../infra/customErrors/HttpException";

export const WorkerController = new Elysia()
    .post("/", async({set, body})=>{
        const worker = validator(createWorkerRequest,body ) as Worker
        const result = await workerService.CreateWorker(worker);
        set.status = 200
        return result;
    })
    .get("/", async({set,body})=>{
        const workers = await workerService.getAllWorkers();
        return workers;
    })
    .get("/:id", async({set,body, params})=>{
        if(!params.id) throw new HttpException("id é obrigatório", 400);
        const worker = await workerService.getWorkerById(params.id);
        set.status = 200;
        return worker;
    })
    .put("/:id", async({set,body, params})=>{
        if(!params.id) throw new HttpException("id é obrigatório", 400);
        
        const newWorker = await validator(updateWorkerRequest, body) as Partial<Worker> 
        if(newWorker.registrationNumber) throw new HttpException("matrícula não pode ser alterada", 400);
        const result = await workerService.updateWorker(params.id,newWorker)
        return result;
    })
    .delete("/:id", async({set, body, params})=>{
        if(!params.id) throw new HttpException("id é obrigatório", 400)
        const result = await workerService.deleteWorker(params.id);
        set.status = 200;
        return result;        
    })
