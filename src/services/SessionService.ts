import { HttpException } from "../infra/customErrors/HttpException";
import { Session, Session } from "../infra/schemas/SessionSchema";
import * as workerService from "../services/WorkerService";

export const getSession = async () => {
    const session = await Session.find();
    const worker = await workerService.getWorkerByCardId(session[0].cardId);
    if (!worker) {
        throw new HttpException("Operário não encontrado", 404);
    }
    const deleted = await Session.deleteMany({});
    return worker;
}

export const newSession = async (cardId: string) => {
    const session = new Session({
        cardId: cardId,
    });
    const result = await Session.insertOne(session);
    return {
        message: "Sessão iniciada",
        session: result,
    }
}