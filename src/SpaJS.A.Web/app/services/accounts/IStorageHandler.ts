///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular-cookies.d.ts" />

module app.services.accounts {

    export interface IStorageHandler {
        setItem(key: string, value: any): void;
        removeItem(key): void;
        getItem(key): any;
    }
}