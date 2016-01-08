///<reference path="IEntity.ts" />
///<reference path="IAddress.ts" />

/*
N.B. Typescript classes can split between different types
*/


module app.domain {

    //By implementing an interface we force a class to define certain properties or functions
    export interface ICustomer {
        CustomerId?: number;
        FirstName: string;
        Surname: string;
        Active: boolean;
        Address: IAddress;
    }

    //We create a class with public properties in the constructor, this automtically creates the relative properties
    export class Customer extends app.domain.EntityBase implements app.domain.ICustomer {
        constructor(
            public FirstName: string,
            public Surname: string,
            public Active: boolean,
            public Address: Address,
            public CustomerId?: number // OPTIONAL PARAMS NEED TO GOTO THE END
            ) {

            super();
            
            //Relative properties
            this.CustomerId = CustomerId;
            this.FirstName = FirstName;
            this.Surname = Surname;
            this.Active = Active;
            this.Address = Address;
        }
    }

    //export class Customers extends app.domain.Customer implements ICustomer {
    //    Customers: Array<Customer>;
    //}
}

