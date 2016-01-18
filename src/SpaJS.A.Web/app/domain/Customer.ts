///<reference path="../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="IEntity.ts" />
///<reference path="IAddress.ts" />

/*
N.B. Typescript classes can split between different types
*/


module app.domain {

    //By implementing an interface we force a class to define certain properties or functions
    export interface ICustomer {
        id?: number;
        firstName: string;
        surname: string;
        active: boolean;
        address: app.domain.IAddress;
    }

    //We create a class with public properties in the constructor, this automtically creates the relative properties
    export class Customer extends app.domain.EntityBase implements app.domain.ICustomer {
        constructor(
            public firstName: string,
            public surname: string,
            public active: boolean,
            public address: app.domain.Address,
            public id?: number // OPTIONAL PARAMS NEED TO GOTO THE END
            ) {

            super();
            
            //Relative properties
            this.id = id;
            this.firstName = firstName;
            this.surname = surname;
            this.active = active;
            this.address = address;
        }
    }

    //export class Customers extends app.domain.Customer implements ICustomer {
    //    Customers: Array<Customer>;
    //}
}

