var app;
(function (app) {
    var domain;
    (function (domain) {
        var common;
        (function (common) {
            'use strict';
            var Message = (function () {
                function Message(success, description) {
                    this.Success = success;
                    this.Description = description;
                }
                return Message;
            })();
            common.Message = Message;
        })(common = domain.common || (domain.common = {}));
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
