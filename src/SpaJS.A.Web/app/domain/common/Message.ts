///<reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
///<reference path="IMessage.ts" />

module app.domain.common {
    'use strict';

    export class Message implements app.domain.common.IMessage {
        Success: boolean;
        Description: string;

        constructor(success: boolean, description: string) {
            this.Success = success;
            this.Description = description;
        }
    }
}

