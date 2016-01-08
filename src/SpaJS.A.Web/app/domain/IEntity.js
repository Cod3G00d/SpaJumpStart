/*
We are going to force all our domain object entities to extend the EntityBase class
So we have a new Typescript module called app.domain and we have declared ain interface and class that will be available
outside this module, because we used the export keyword
*/
var app;
(function (app) {
    var domain;
    (function (domain) {
        var EntityBase = (function () {
            function EntityBase() {
            }
            return EntityBase;
        })();
        domain.EntityBase = EntityBase;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=IEntity.js.map