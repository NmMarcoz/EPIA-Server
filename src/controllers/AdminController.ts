import Elysia from "elysia";
import { validator } from "../infra/utils/validator";
import { createAdminRequest, createWorkerRequest, updateAdminRequest, updateWorkerRequest } from "../infra/types/SchemaRequestTypes";
import * as adminService from "../services/AdminService";
import { Admin } from "../infra/schemas/AdminSchema";
import { HttpException } from "../infra/customErrors/HttpException";

export const AdminController = new Elysia()
    .post("/", async({set, body})=>{
        const admin = validator(createAdminRequest,body ) as Admin;
        const result = await adminService.CreateAdmin(admin);
        set.status = 200
        return result;
    })
    .get("/", async({set,body})=>{
        const admins = await adminService.getAllAdmins();
        return admins;
    })
    .get("/:id", async ({set, body, params})=>{
        if(!params.id) throw new HttpException("id é obrigatório", 400);
        const admin = await adminService.getAdminById(params.id);
        return admin
    })
    .put("/:id", async({set,body, params})=>{
        if(!params.id) throw new HttpException("id é obrigatório", 400);
    
        const newAdmin = await validator(updateAdminRequest, body) as Partial<Admin> 
        if(newAdmin.password) throw new HttpException("Não é possível atualizar a senha", 403);
        const result = await adminService.updateAdmin(params.id, newAdmin)
        set.status = 200;
        return result;
    })
    .delete("/:id", async({set, body, params})=>{
        if(!params.id) throw new HttpException("id é obrigatório", 400)
        const result = await adminService.deleteAdmin(params.id);
        set.status = 200;
        return result;        
    })
