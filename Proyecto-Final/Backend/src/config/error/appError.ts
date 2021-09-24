export class AppError extends Error {

    code: number;

    constructor(message: string, code: number){
        super();
        this.message = message;
        this.code = code;
    }

    static badRequestError(message: string) {
        return new AppError(message, 400);
    }

    static internalError(message: string) {
        return new AppError(message, 500);
    }

}