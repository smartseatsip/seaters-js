import * as popsicle from 'popsicle';
export declare enum ERROR_TYPE {
    CLIENT = 0,
    SERVER = 1,
}
export interface ApiError {
    rawResponse: popsicle.Response;
    type: ERROR_TYPE;
    error: string;
    errorMsg: string;
    fields?: [{
        field: string;
        error: string;
        errorMsg: string;
    }];
}
