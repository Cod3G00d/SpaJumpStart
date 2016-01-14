var app;
(function (app) {
    var services;
    (function (services) {
        var accounts;
        (function (accounts) {
            var StorageHandler = (function () {
                function StorageHandler($cookieStore) {
                    this.$cookieStore = $cookieStore;
                    this._canUseSessionStorage = this.isSessionStorageAvaliable();
                }
                StorageHandler.prototype.isSessionStorageAvaliable = function () {
                    try {
                        var key = 'test';
                        sessionStorage.setItem(key, key);
                        sessionStorage.removeItem(key);
                        return true;
                    }
                    catch (e) {
                        return false;
                    }
                };
                StorageHandler.prototype.setItem = function (key, value) {
                    var self = this;
                    if (self._canUseSessionStorage) {
                        sessionStorage.setItem(key, value);
                    }
                    else {
                        self.$cookieStore.put(key, value);
                    }
                    ;
                };
                StorageHandler.prototype.removeItem = function (key) {
                    var self = this;
                    if (self._canUseSessionStorage) {
                        sessionStorage.removeItem(key);
                    }
                    else {
                        self.$cookieStore.remove(key);
                    }
                    ;
                };
                StorageHandler.prototype.getItem = function (key) {
                    var self = this;
                    if (self._canUseSessionStorage) {
                        return sessionStorage.getItem(key);
                    }
                    else {
                        return self.$cookieStore.get(key);
                    }
                };
                StorageHandler.$inject = ['$cookieStore'];
                return StorageHandler;
            })();
            accounts.StorageHandler = StorageHandler;
        })(accounts = services.accounts || (services.accounts = {}));
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
angular
    .module('sampleAngularApp')
    .service('storageHandler', app.services.accounts.StorageHandler);
