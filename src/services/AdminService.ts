import { Admin } from "../infra/schemas/AdminSchema";
import { HttpException } from "../infra/customErrors/HttpException";
import bcrypt from "bcrypt"

export const CreateAdmin = async (body: Admin) => {
    const salt = await bcrypt.genSalt(10);
    const crypted = await bcrypt.hash(body.password, salt);
    const {password, ...withoutPass} = body;
    const admin = new Admin({password: crypted, ...withoutPass});
    await admin.save();
    return {
        message: "Administrador registrado"
    };
};

export const getAllAdmins = async () => {
    const admins = await Admin.find();
    console.log("admins", admins);
    if(admins.length === 0){
        throw new HttpException("Sem administradores cadastrados", 404);
    }
    return admins.map((admin) => {
        return admin.getBaseAttributes()
    });
    
};

export const getAdminById = async (id: string) => {
    const admin = await Admin.findById(id);
    if (!admin) throw new HttpException("Admnistrador não encontrado", 404);
    return admin.getBaseAttributes();
};

export const updateAdmin = async (id: string, data: Partial<Admin>) => {
    const admin = await Admin.findByIdAndUpdate(id, data, { new: true });
    if (!admin) throw new HttpException("Admin não encontrado", 404);
    return admin.getBaseAttributes();
};

export const deleteAdmin = async (id: string) => {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) throw new HttpException("Admnistrador não encontrado", 404);
    return { message: "Admnistrador removido com sucesso" };
};
