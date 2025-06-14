import { Log } from "../infra/schemas/LogSchema";
import { HttpException } from "../infra/customErrors/HttpException";
import bcrypt from "bcrypt";
import * as workerService from "./WorkerService";
import { BoundModule } from "arktype";
import { convertUnixTimestampToTime } from "../infra/utils/auxiliares";
import * as sectorService from "../services/SectorService";
export const CreateLog = async (body: Log) => {
    await workerService.getWorkerById(String(body.worker));
    const log = new Log(body);
    await log.save();
    return {
        message: "Log salvo",
    };
};

export const getAllLogs = async () => {
    const logs = await Log.find().populate("worker").populate("sector");
    console.log("logs", logs);
    if (logs.length === 0) {
        throw new HttpException("Sem logs armazenados", 404);
    }
    return logs.map((log) => {
        return {
            id: log._id,
            worker: log.worker,
            sector: log.sector,
            removedEpi: log.removedEpi,
            remotionHour:
                log.remotionHour.length > 5
                    ? convertUnixTimestampToTime(Number(log.remotionHour))
                    : log.remotionHour,
            allEpiCorrects: log.allEpiCorrects,
            //@ts-ignore
            createdAt: log!.createdAt,
        };
    });
};

export const getLogById = async (id: string) => {
    const log = await Log.findById(id).populate("worker").populate("sector");
    if (!log) throw new HttpException("Log não encontrado", 404);
    return {
        id: log._id,
        worker: log.worker,
        sector: log.sector,
        removedEpi: log.removedEpi,
        remotionHour: log.remotionHour,
        allEpiCorrects: log.allEpiCorrects,
        //@ts-ignore
        createdAt: log!.createdAt,
    };
};

export const saveLot = async (body: Log[]) => {
    const sector = await sectorService.getById(String(body[0].sector));
    body.forEach((log) => {
        log.allEpiCorrects =
            //@ts-ignore
            //TODO ->testar
            sector.rules.includes(log.removedEpi)
             
    });
    await Log.insertMany(body);
    return { message: "Logs salvos" };
};

export const updateLog = async (id: string, data: Partial<Log>) => {
    const log = await Log.findByIdAndUpdate(id, data, { new: true });
    if (!log) throw new HttpException("Log não encontrado", 404);
    return log.getBaseAttributes();
};

export const deleteLog = async (id: string) => {
    const log = await Log.findByIdAndDelete(id);
    if (!log) throw new HttpException("Log não encontrado", 404);
    return { message: "Log removido com sucesso" };
};
