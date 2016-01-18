///<reference path="../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../Scripts/typings/angularjs/angular.d.ts" />
//<reference path="IEntity.ts">

module app.domain {

    //By implementing an interface we force a class to define certain properties or functions
    export interface IAddress {
        addressId?: number;
        addressLine1: string;
        addressLine2: string;
        addressLine3: string;
        addressLine4: string;
        email: string;
        postcode: string;
    }
}