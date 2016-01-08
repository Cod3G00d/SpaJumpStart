/*
We are going to force all our domain object entities to extend the EntityBase class
So we have a new Typescript module called app.domain and we have declared ain interface and class that will be available
outside this module, because we used the export keyword
*/
module app.domain {
    //Make the interface and class available outside of the module using export
    export interface IEntity { }

    export class EntityBase implements IEntity {
        constructor() { }
    }
}