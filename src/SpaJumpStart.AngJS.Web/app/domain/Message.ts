///<reference path="IMessage.ts" />

module app.domain {
    'use strict';

    export class Message implements app.domain.IMessage {
        Success: boolean;
        Description: string;

        constructor(success: boolean, description: string) {
            this.Success = success;
            this.Description = description;
        }
    }
}

