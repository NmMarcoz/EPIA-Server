import Elysia from "elysia";
import * as notificationService from "../services/NotificationService";
import { Notification } from "../infra/schemas/NotificationSchema";
export const NotificationsController = new Elysia()
    .get("/", async ({ set }) => {
        const notifications = await notificationService.get();
        return notifications;
    })
    .post("/", async ({ body, set }) => {
        const notification = body as Notification;
        const result = await notificationService.save(notification);
        set.status = 201;
        return result;
    })
    .delete("/", async ({ set }) => {
        const result = await notificationService.deleteAll();
        set.status = 200;
        return result;
    })
    .delete("/:id", async ({ set, params }) => {
        const id = params.id as string;
        const result = await notificationService.deleteOne(id);
        set.status = 200;
        return result;
    });
