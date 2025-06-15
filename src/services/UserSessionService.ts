import { HttpException } from "../infra/customErrors/HttpException";
import { Session } from "../infra/schemas/SessionSchema";
import { UserSessionModel, UserSessionType } from "../infra/schemas/UserSession";


export const getUserSession = async () => {
    const session = await UserSessionModel.find();
    if(session.length ===0 ) throw new HttpException("Sem sessões ativas", 404);
    return session;
}

export const getUserSessionById = async (cardId: string) => {
    const session = await UserSessionModel.findOne({ cardId: cardId });
    return session;
}

export const newSession = async (body:UserSessionType) => {
    const session = new UserSessionModel(body);
    await UserSessionModel.deleteMany({cardId: body.cardId})
    const result = await UserSessionModel.insertOne(session);
    return {result}
}

export const deleteSessions = async () => {
    const result = await UserSessionModel.deleteMany({});
    if (result.deletedCount === 0) {
        throw new HttpException("Nenhuma sessão ativa para deletar", 404);
    }
    return {
        message: "Todas as sessões foram deletadas",
        deletedCount: result.deletedCount,
    };
}

export const updateUserSession = async (id: string, allCorrects:Boolean) => {
 
    console.log("id", id)
    const session = await UserSessionModel.findOneAndUpdate({_id: id}, {allCorrects:allCorrects}, {new:true})
    return session
}