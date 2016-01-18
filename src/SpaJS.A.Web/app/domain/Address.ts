///<reference path="../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="IAddress.ts" />
///<reference path="EntityBase.ts" />

module app.domain {

    export class Address extends app.domain.EntityBase implements app.domain.IAddress {
        constructor(
            public addressLine1: string,
            public addressLine2: string,
            public addressLine3: string,
            public addressLine4: string,
            public email: string,
            public postcode: string,
            public addressId?: number
            ) {

            super();
            
            //Relative properties
            this.addressId = addressId;
            this.addressLine1 = addressLine1;
            this.addressLine2 = addressLine2;
            this.addressLine3 = addressLine3;
            this.addressLine4 = addressLine4;
            this.email = email;
            this.postcode = postcode;
        }
    }
}

