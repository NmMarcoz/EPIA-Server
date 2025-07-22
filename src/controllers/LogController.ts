import Elysia from "elysia";
import { validator } from "../infra/utils/validator";
import { createLogRequest } from "../infra/types/SchemaRequestTypes";
import * as logService from "../services/LogService";
import { Log } from "../infra/schemas/LogSchema";
import { HttpException } from "../infra/customErrors/HttpException";
import axios from "axios";
import { getNotificationMessage } from "../infra/utils/auxiliares";

// Gerenciador de conexões WebSocket
const wsConnections = new Set<any>();

export const LogController = new Elysia()
    .post("/", async ({ set, body }) => {
        const log = validator(createLogRequest, body) as Log;
        const result = await logService.CreateLog(log);
        set.status = 200;
        wsConnections.forEach((ws) => {
            if (!result.log.allEpiCorrects) {
                const data = {
                    message: getNotificationMessage(result.log).message,
                    summary: getNotificationMessage(result.log).summary,
                    log: result.log,
                };
                console.log("Enviando notificação", data);
                ws.send(
                    JSON.stringify({
                        type: "notification",
                        data: data
                    })
                );
            }
        });

        return result;
    })
    .post("/lot", async ({ set, body }) => {
        if (!Array.isArray(body))
            throw new HttpException("body deve ser um array", 400);
        console.log("body", body);
        for (const log of body) {
            console.log("body", log);
            await validator(createLogRequest, log);
        }
        const result = await logService.saveLot(body);

        for (const log of body) {
            wsConnections.forEach((ws) => {
                console.log("log no connection", log);
                try {
                    if (log.allEpiCorrects) {
                        console.log("deveria notificar");
                        ws.send(
                            JSON.stringify({
                                type: "notification",
                                data: {
                                    message:
                                        getNotificationMessage(log).message,
                                    summary:
                                        getNotificationMessage(log).summary,
                                    log: log,
                                },
                            })
                        );
                    }
                } catch (e) {
                    wsConnections.delete(ws);
                }
            });
        }
        return {
            message: "logs criados",
        };
    })
    .get("/", async ({ set }) => {
        const logs = await logService.getAllLogs();
        return logs;
    })
    .get("/:id", async ({ set, params }) => {
        if (!params.id) throw new HttpException("id é obrigatório", 400);
        const log = await logService.getLogById(params.id);
        return log;
    })
    .delete("/", async ({ set }) => {
        const result = await logService.deleteAll();
        set.status = 204;
        return result;
    })
    .ws("/notifications", {
        open(ws) {
            console.log("WebSocket conectado");
            console.log("ws", ws);
            ws.send(
                JSON.stringify({
                    type: "welcome",
                    message: "Conexão estabelecida com sucesso!",
                })
            );
            wsConnections.add(ws);
        },
        close(ws) {
            wsConnections.delete(ws);
        },
        message(ws, data) {
            wsConnections.forEach((client) => {
                if (client !== ws) {
                    try {
                        client.send(JSON.stringify({ tipo: "eco", data }));
                    } catch (e) {
                        wsConnections.delete(client);
                    }
                }
            });
        },
    });
