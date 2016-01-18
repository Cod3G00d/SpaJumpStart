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
            function Address(addressLine1, addressLine2, addressLine3, addressLine4, email, postcode, addressId) {
                _super.call(this);
                this.addressLine1 = addressLine1;
                this.addressLine2 = addressLine2;
                this.addressLine3 = addressLine3;
                this.addressLine4 = addressLine4;
                this.email = email;
                this.postcode = postcode;
                this.addressId = addressId;
                this.addressId = addressId;
                this.addressLine1 = addressLine1;
                this.addressLine2 = addressLine2;
                this.addressLine3 = addressLine3;
                this.addressLine4 = addressLine4;
                this.email = email;
                this.postcode = postcode;
            }
            return Address;
        })(app.domain.EntityBase);
        domain.Address = Address;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
