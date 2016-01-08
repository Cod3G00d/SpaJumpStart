/*
HttpService to define an api URI to use across our application 
*/
module app.common.services {

    interface IConstants {
        appTitle: string;
        baseUri: string;
        postUri: string;
    }

    //Only export the service and not the interface

    export class ConstantsService implements IConstants {
        //property created outside the constructor
        appTitle: string;
        baseUri: string;
        postUri: string;

        //static $inject = [];
        constructor() {
            this.appTitle = "Sample Spa App: Customer Interactions With Promises"
            this.baseUri = "http://localhost:1625";
            this.postUri = "/api/Customer/";

        }
    }
    
    angular.module("sampleAngularApp")
        .service("constantsService", app.common.services.ConstantsService);

}