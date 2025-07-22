import { Log } from "../infra/schemas/LogSchema";
import { HttpException } from "../infra/customErrors/HttpException";
import bcrypt from "bcrypt";
import * as workerService from "./WorkerService";
import { BoundModule } from "arktype";
import * as notificationService from "./NotificationService";
import {
    
    convertUnixTimestampToTime,
    epiCorrects,
    getNotificationMessage,
    saveNotification,
} from "../infra/utils/auxiliares";
import * as sectorService from "../services/SectorService";
import { Notification } from "../infra/schemas/NotificationSchema";
import { get } from "mongoose";
export const CreateLog = async (body: Log) => {
    await workerService.getWorkerById(String(body.worker));
    const log = new Log(body);
    const sector = await sectorService.getById(String(log.sector));
    log.remotionHour =
        log.remotionHour.length > 5
            ? convertUnixTimestampToTime(Number(log.remotionHour))
            : log.remotionHour;
    log.allEpiCorrects = 
        //@ts-ignore
        //TODO ->testar
        epiCorrects(log.removedEpi, sector.rules);

    const result = await log.save();
    if (!log.allEpiCorrects && log.notify) {
        await saveNotification(result); 
    }

    return {
        message: "Log salvo",
        log: log
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
            notify: log.notify,
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
    for (const log of body) {
        log.remotionHour =
            log.remotionHour.length > 5
                ? convertUnixTimestampToTime(Number(log.remotionHour))
                : log.remotionHour;
        //@ts-ignore
        log.allEpiCorrects = epiCorrects(log.removedEpi, sector.rules);
        
    }
    const result = await Log.insertMany(body);
    for(const log of result) {
        if(!log.allEpiCorrects && log.notify) {
             await saveNotification(log);
        }
       
    }
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

export const deleteAll = async()=>{
    const result = await Log.deleteMany({});
    if (result.deletedCount === 0) throw new HttpException("Nenhum log encontrado", 404);
    return { message: "Todos os logs foram removidos com sucesso" , count: result.deletedCount};
}
