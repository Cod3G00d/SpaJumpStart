module app.services.interceptors {

    export interface IErrorHandlerService {
        logError(status: string, message: string, rejection?: any): void;
        logServiceError(controllerName: string, reason: string): void;
        logServiceNotify(controllerName: string, update: any): void;
    }
}