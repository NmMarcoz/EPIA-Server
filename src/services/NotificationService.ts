import { HttpException } from "../infra/customErrors/HttpException";
import { Notification } from "../infra/schemas/NotificationSchema";

export const save = async (notification: Notification) => {
    const newNotification = new Notification(notification);
    await newNotification.save();
    return {
        message: "Notificação salva com sucesso",
        notification: newNotification,
    };
};
export const get = async () => {
    const notifications = await Notification.find().sort({ createdAt: -1 }).populate("log");
    if (notifications.length === 0) {
        throw new HttpException("Sem notificações", 404);
    }
    await Notification.updateMany({}, { consumed: true });

    return notifications;
};

export const deleteAll = async()=>{
    const result = await Notification.deleteMany({});
    if (result.deletedCount === 0) {
        throw new HttpException("Nenhuma notificação para deletar", 404);
    }
    return {
        message: "Todas as notificações foram deletadas",
        deletedCount: result.deletedCount,
    };
}

export const deleteOne = async(id:string)=>{
    const result = await Notification.deleteOne({_id: id});
    if (result.deletedCount === 0) {
        throw new HttpException("Nenhuma notificação para deletar", 404);
    }
    return {
        message: "Todas as notificações foram deletadas",
        deletedCount: result.deletedCount,
    };
}