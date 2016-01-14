var app;
(function (app) {
    var services;
    (function (services) {
        var accounts;
        (function (accounts) {
            var StorageHandler = (function () {
                function StorageHandler($cookieStore) {
                    this.$cookieStore = $cookieStore;
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
                    var canUseSessionStorage = self.isSessionStorageAvaliable();
                    if (canUseSessionStorage) {
                        sessionStorage.setItem(key, value);
                    }
                    else {
                        this.$cookieStore.put(key, value);
                    }
                    ;
                };
                StorageHandler.$inject = ['$cookieStore'];
                return StorageHandler;
            })();
            accounts.StorageHandler = StorageHandler;
        })(accounts = services.accounts || (services.accounts = {}));
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
