///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />

module app.services.accounts {

    export interface ITokenHandlerService {
        setLoginToken(token): void;
        getLoginToken(): any;
        removeLoginToken(): void;
        hasLoginToken(): boolean;
        setRedirectUrl(url): void;
        getRedirectUrl(): string;
        setLoginName(name): void;
        getLoginName(): string;
    }
}