///<reference path="IMessage.ts" />
var app;
(function (app) {
    var domain;
    (function (domain) {
        'use strict';
        var Message = (function () {
            function Message(success, description) {
                this.Success = success;
                this.Description = description;
            }
            return Message;
        })();
        domain.Message = Message;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=Message.js.map