/*
HttpService to define an api URI to use across our application 
*/

///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference_path="IConstantsService.ts" />

module app.services.common {

    //Only export the service and not the interface
    export class ConstantsService implements IConstantsService {
        //property created outside the constructor
        appTitle: string;
        baseUri: string;
        postUri: string;

        //static $inject = [];
        constructor() {
            this.appTitle = "Sample Spa App: Customer Interactions With Promises"
            this.baseUri = "http://localhost:5196";
            this.postUri = "/api/customers/";

        }
    }

    angular.module("sampleAngularApp")
        .service("constantsService", app.services.common.ConstantsService);
}