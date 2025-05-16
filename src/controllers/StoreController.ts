import Elysia from "elysia";
import { validator } from "../infra/utils/validator";
import { CreateStoreRequest } from "../infra/utils/typeValidations";
import * as storeService from "../services/StoreService";

export const StoreController = new Elysia()
    .get("/", async ({set}) => {
        const stores = await storeService.getAllStores();
        set.status = 200;
        return{
            message: "Lojas encontradas",
            stores
        }
    })
    .post("/", async ({ body, set, headers }) => {
        type Store = typeof CreateStoreRequest.infer;
        const store = validator(CreateStoreRequest, body) as Store;
        await storeService.createStore(store)
        set.status = 201
        return{
            message: "Loja criada",
            store: store
        }
    })