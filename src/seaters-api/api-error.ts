import * as popsicle from 'popsicle';

export enum ERROR_TYPE {
    CLIENT, SERVER
}

export interface ApiError {
    rawResponse: popsicle.Response,
    type: ERROR_TYPE,
    error: string,
    errorMsg: string,
    fields?: [
        {
            field: string,
            error: string,
            errorMsg: string
        }
    ];
}