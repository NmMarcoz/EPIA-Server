import { Worker } from "../infra/schemas/WorkerSchema";
import { HttpException } from "../infra/customErrors/HttpException";

export const CreateWorker = async (body: Worker) => {
    const worker = new Worker(body);
    await worker.save();
    return {
        message: "Operário registrado"
    };
};

export const getAllWorkers = async () => {
    const workers = await Worker.find();
    console.log("workers", workers);
    if(workers.length === 0){
        throw new HttpException("Sem operários cadastrados", 404);
    }
    return workers.map((worker) => {
        return worker.getBaseAttributes()
    });
    
};

export const getWorkerById = async (id: string) => {
    const worker = await Worker.findById(id);
    if (!worker) throw new HttpException("Operário não encontrado", 404);
    return worker.getBaseAttributes();
};

export const updateWorker = async (id: string, data: Partial<Worker>) => {
    const worker = await Worker.findByIdAndUpdate(id, data, { new: true });
    if (!worker) throw new HttpException("Operário não encontrado", 404);
    return worker.getBaseAttributes();
};

export const deleteWorker = async (id: string) => {
    const worker = await Worker.findByIdAndDelete(id);
    if (!worker) throw new HttpException("Operário não encontrado", 404);
    return { message: "Operário removido com sucesso" };
};
