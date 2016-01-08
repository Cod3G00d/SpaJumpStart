///<reference path="IEntity.ts" />
///<reference path="IAddress.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
N.B. Typescript classes can split between different types
*/
var app;
(function (app) {
    var domain;
    (function (domain) {
        //We create a class with public properties in the constructor, this automtically creates the relative properties
        var Customer = (function (_super) {
            __extends(Customer, _super);
            function Customer(FirstName, Surname, Active, Address, CustomerId // OPTIONAL PARAMS NEED TO GOTO THE END
                ) {
                _super.call(this);
                this.FirstName = FirstName;
                this.Surname = Surname;
                this.Active = Active;
                this.Address = Address;
                this.CustomerId = CustomerId;
                //Relative properties
                this.CustomerId = CustomerId;
                this.FirstName = FirstName;
                this.Surname = Surname;
                this.Active = Active;
                this.Address = Address;
            }
            return Customer;
        })(app.domain.EntityBase);
        domain.Customer = Customer;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=Customer.js.map