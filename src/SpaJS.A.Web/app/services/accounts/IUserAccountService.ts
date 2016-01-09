///<reference path="../../../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../domain/accounts/IRegistrationData.ts" />
///<reference path="../../domain/accounts/registrationData.ts" />
///<reference path="../../domain/accounts/ILoginData.ts" />

module app.services.accounts {

    export interface IUserAccountService {
        registerUser(registrationData: app.domain.accounts.IRegistrationData): ng.IPromise<any>;
        logInUser(userData: app.domain.accounts.ILoginData): ng.IPromise<any>;
        logOutUser(): ng.IPromise<any>;
        userIsAuthenticated(): boolean;
    }
}
