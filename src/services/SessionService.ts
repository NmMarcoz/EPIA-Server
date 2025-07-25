import { HttpException } from "../infra/customErrors/HttpException";
import { Session, Session } from "../infra/schemas/SessionSchema";
import * as workerService from "../services/WorkerService";

export const getSession = async () => {
    const session = await Session.find();
    if(!session || session.length === 0) throw new HttpException("Sem sessões ativas", 404)
    const worker = await workerService.getWorkerByCardId(session[0].cardId);
    if (!worker) {
        throw new HttpException("Operário não encontrado", 404);
    }
    //const deleted = await Session.deleteMany({});
    return worker;
}

export const newSession = async (cardId: string) => {
    const worker = await workerService.getWorkerByCardId(cardId).catch(async (err) =>{
        await Session.deleteMany({});
        throw new HttpException("Operário não encontrado", 404);
    
    });
   
    const session = new Session({
        cardId: cardId,
    });
    await Session.deleteMany()
    const result = await Session.insertOne(session);
    return {
        message: "Sessão iniciada",
        session: result,
    }
}

export const deleteSessions = async () => {
    const result = await Session.deleteMany({});
    if (result.deletedCount === 0) {
        throw new HttpException("Nenhuma sessão ativa para deletar", 404);
    }
    return {
        message: "Todas as sessões foram deletadas",
        deletedCount: result.deletedCount,
    };
}