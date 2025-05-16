export class ValidationException extends Error {
    public message:string = "Erro de validação";
    public reason:{
        summary: string,
        details: string | {}
    }
    constructor(reason:{summary:string, details:string | {}}){
        super();
        this.reason = reason;
    }
}