///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />

module app.services.common {

    export interface IDataService {
        get(resource: string, fetchFromService?: boolean): ng.IPromise<app.domain.EntityBase[]>;
        getSingle(resource: string): ng.IPromise<app.domain.EntityBase>;
        add(resource: string, entity: app.domain.IEntity): ng.IPromise<app.domain.EntityBase>;
        update(resource: string, entity: app.domain.IEntity): ng.IPromise<app.domain.EntityBase>;
        remove(resource: string): ng.IPromise<any>;
    }
}