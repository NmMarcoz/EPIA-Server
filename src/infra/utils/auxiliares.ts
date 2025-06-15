import { Log } from "../schemas/LogSchema";
import { Notification } from "../schemas/NotificationSchema";
import * as notificationService from "../../services/NotificationService";
export const convertUnixTimestampToTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

export function arraysHaveSameItems(a: string[], b: string[]) {
    if(a == null) return true;
    const condition =
        a.every((item) => b.includes(item)) &&
        b.every((item) => a.includes(item));
    if (condition) {
        console.log("array sao iguais (epi corretos)");
    } else console.log("array sao diferentes (epi invalidos)");
    return condition;
}

export function getNotificationMessage(log: Log) {
    let message = "";
    let summary = "";
    if (log.allEpiCorrects) {
        return {
            message: "sdasd",
            summary: "sdasd",
        };
    }
    const hour = log.remotionHour.length <= 5 
        ? log.remotionHour
        : convertUnixTimestampToTime(Number(log.remotionHour)) ;
    console.log("hour", hour);
    summary = `O trabalhador de id:${
        log.worker
    } removeu os EPIs: ${log.removedEpi!.join(", ")} no setor de id: ${
        log.sector
    } às ${hour}.`;
    message = "Epi Removido";
    return {
        message,
        summary,
    };
}

export const saveNotification = async (log: Log) => {
    const msgs = getNotificationMessage(log);
    //@ts-ignore
    const notification: Notification = {
        //@ts-ignore
        log: log._id,
        message: msgs.message,
        summary: msgs.summary,
        type: "credenciamento",
        consumed: false,
    };
    await notificationService.save(notification);
    console.log("Notificação salva com sucesso");
};
