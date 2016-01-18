var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var domain;
    (function (domain) {
        var Customer = (function (_super) {
            __extends(Customer, _super);
            function Customer(firstName, surname, active, address, id) {
                _super.call(this);
                this.firstName = firstName;
                this.surname = surname;
                this.active = active;
                this.address = address;
                this.id = id;
                this.id = id;
                this.firstName = firstName;
                this.surname = surname;
                this.active = active;
                this.address = address;
            }
            return Customer;
        })(app.domain.EntityBase);
        domain.Customer = Customer;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
