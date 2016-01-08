///<reference path="IAddress.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var domain;
    (function (domain) {
        var Address = (function (_super) {
            __extends(Address, _super);
            function Address(AddressLine1, AddressLine2, AddressLine3, AddressLine4, Email, Postcode, AddressId) {
                _super.call(this);
                this.AddressLine1 = AddressLine1;
                this.AddressLine2 = AddressLine2;
                this.AddressLine3 = AddressLine3;
                this.AddressLine4 = AddressLine4;
                this.Email = Email;
                this.Postcode = Postcode;
                this.AddressId = AddressId;
                //Relative properties
                this.AddressId = AddressId;
                this.AddressLine1 = AddressLine1;
                this.AddressLine2 = AddressLine2;
                this.AddressLine3 = AddressLine3;
                this.AddressLine4 = AddressLine4;
                this.Email = Email;
                this.Postcode = Postcode;
            }
            return Address;
        })(app.domain.EntityBase);
        domain.Address = Address;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=Address.js.map