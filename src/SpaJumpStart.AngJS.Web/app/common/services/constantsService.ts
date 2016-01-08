/*
HttpService to define an api URI to use across our application 
*/
module app.common.services {
    'use strict';    

    angular.module("sampleAngularApp")
        .service("constantsService", app.common.services.ConstantsService);

    interface IConstants
    {
        appTitle: string;
        baseUri: string;
        postUri: string;
    }

    //Only export the service and not the interface

    export class ConstantsService implements IConstants
    {
        //property created outside the constructor
        appTitle: string;
        baseUri: string;
        postUri: string;

        //static $inject = [];
        constructor()
        {
            this.appTitle = "Sample Spa App: Customer Interactions With Promises"
            this.baseUri = "http://localhost:5196";
            this.postUri = "/api/customers/";

        }
    }
}