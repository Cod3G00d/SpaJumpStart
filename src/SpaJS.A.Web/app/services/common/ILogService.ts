module app.services.common {
    'use strict';

    export interface ILogService {
        log(message: string): void;
    }
}