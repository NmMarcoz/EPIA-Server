import { Elysia } from "elysia";
import { CreateUserRequest } from "../infra/utils/typeValidations";
import { type } from "arktype";
import * as sectorService from "../services/SectorService"
import { validator } from "../infra/utils/validator";
import { CreateSectorRequest, UpdateSectorRequest } from "../infra/types/SchemaRequestTypes";
import { Sector } from "../infra/schemas/SectorSchema";
import { ValidationException } from "../infra/customErrors/ValidationException";
import { HttpException } from "../infra/customErrors/HttpException";

export const SectorController = new Elysia()
    .get("/", async ({set}) => {
        const response = await sectorService.getAllSectors();
        set.status = 200
        return response;
    })
    .post("/", async ({ body, set, headers }) => {
        const sector = validator(CreateSectorRequest, body) as Sector;
        const response = await sectorService.createSector(sector);
        set.status = 201
        return response;
    })
    .get("/:code", async ({params, set})=>{
        if(!params.code) throw new HttpException("code é obrigatório", 400);
        const response = await sectorService.getByCode(params.code);
        return response;
    })
    .get("/id/:id", async ({params, set})=>{
        if(!params.id) throw new HttpException("code é obrigatório", 400);
        const response = await sectorService.getById(params.id);
        return response;
    })
    .put("/:code", async ({params, body, set})=>{
        console.log("update body", body);
        if(!params.code) throw new HttpException("code é obrigatório", 400);
        if(!body || Object.keys(body).length === 0) throw new ValidationException({
            summary: "Pelo menos um campo deve ser enviado",
            details: {schema: UpdateSectorRequest.description}
        })
        const sector = validator(UpdateSectorRequest, body) as Sector;
        const {code, ...newBody} = sector;
        //@ts-ignore
        const response = await sectorService.update(params.code, newBody);
        return response;
    })