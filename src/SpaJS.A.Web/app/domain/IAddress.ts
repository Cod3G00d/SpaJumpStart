﻿///<reference path="../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../Scripts/typings/angularjs/angular.d.ts" />
//<reference path="IEntity.ts">

module app.domain {

    //By implementing an interface we force a class to define certain properties or functions
    export interface IAddress {
        AddressId?: number;
        AddressLine1: string;
        AddressLine2: string;
        AddressLine3: string;
        AddressLine4: string;
        Email: string;
        Postcode: string;
    }
}