///<reference path="../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="IAddress.ts" />
///<reference path="EntityBase.ts" />

module app.domain {

    export class Address extends app.domain.EntityBase implements app.domain.IAddress {
        constructor(
            public AddressLine1: string,
            public AddressLine2: string,
            public AddressLine3: string,
            public AddressLine4: string,
            public Email: string,
            public Postcode: string,
            public AddressId?: number
            ) {

            super();
            
            //Relative properties
            this.AddressId = AddressId;
            this.AddressLine1 = AddressLine1;
            this.AddressLine2 = AddressLine2;
            this.AddressLine3 = AddressLine3;
            this.AddressLine4 = AddressLine4;
            this.Email = Email;
            this.Postcode = Postcode;
        }
    }
}

