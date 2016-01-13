///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular-cookies.d.ts" />
///<reference path="IStorageHandler.ts" />

/*
ref: https://github.com/JayBeavers/angular-seed-typescript/blob/master/DefinitelyTyped/angularjs/angular-cookies.d.ts
*/

module app.services.accounts {

    export class StorageHandler implements app.services.accounts.IStorageHandler {
        private _canUseSessionStorage = this.isSessionStorageAvaliable();

        static $inject = ['$cookieStore'];

        constructor(
            private $cookieStore: ng.cookies.ICookieStoreService) { }

        private isSessionStorageAvaliable(): boolean {
            try {
                var key = 'test';
                sessionStorage.setItem(key, key);
                sessionStorage.removeItem(key);
                return true;
            } catch (e) {
                return false;
            }
        }

        setItem(key: string, value: any): void {
            var self = this;

            if (self._canUseSessionStorage) {
                sessionStorage.setItem(key, value);
            } else {
                self.$cookieStore.put(key, value);
            };
        }

        removeItem(key): void {
            var self = this;

            if (self._canUseSessionStorage) {
                sessionStorage.removeItem(key);
            } else {
                self.$cookieStore.remove(key);
            };
        }

        getItem(key): any {
            var self = this;

            if (self._canUseSessionStorage) {
                return sessionStorage.getItem(key);
            } else {
                return self.$cookieStore.get(key);
            }
        }
    }
}
angular
    .module('sampleAngularApp')
    .service('storageHandler', app.services.accounts.StorageHandler);

