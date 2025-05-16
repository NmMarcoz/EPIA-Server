import { db } from "../infra/database/db";
import { Store } from "../infra/types/EntityTypes";

export const createStore = async (data: Omit<Store, "id">) => {
	const sql = `INSERT INTO Store (name,address,cep) VALUES ('${data.name}','${data.address}','${data.cep}')`
    const query = db.query(sql);

    const response = await query.run();

    return response;
}

export const getAllStores = async()=>{
	const sql = "SELECT * FROM Store"
	const query = db.query(sql);
	const stores = await query.all() as Store[];
	const ommited = stores.map((item)=>{
		const {id, ...ommited} = item;
		return ommited;
	})
	return ommited;
}