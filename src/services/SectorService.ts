import { HttpException } from "../infra/customErrors/HttpException";
import { Sector, SectorSchema } from "../infra/schemas/SectorSchema";
import { User } from "../infra/types/EntityTypes";

export const createSector = async (data: Sector) => {
    const sector = new Sector({
        code: data.code,
        name: data.name,
        rules: data.rules,
    });
    console.log("sector", sector);
    await sector.save();
    const response = {
        message: "Setor cadastrado",
        sector: sector,
    };
    //db.close();
    return response;
};

export const getAllSectors = async () => {
    const sectors = await Sector.find();
    if (!sectors) {
        throw new HttpException("Sem setores cadastrados", 404);
    }
    return sectors.map((sector) => {
        return {
            id: sector._id,
            code: sector.code,
            name: sector.name,
            rules: sector.rules,
        };
    });
};

export const getByCode = async(code:string)=>{
    const sector = await Sector.findOne({code});

    if(!sector) throw new HttpException("Setor não encontrado", 404);
    //@ts-ignore
    
    return sector.getUserAvailableFields();
}

export const update = async(code:string, data:Sector)=>{
    const sector  = await Sector.findOneAndUpdate({code}, data, {new:true})
    if(!sector) throw new HttpException("Setor não encontrado", 404);
    
    return sector.getUserAvailableFields();
}
