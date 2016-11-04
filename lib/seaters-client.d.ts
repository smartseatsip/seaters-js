import { Promise } from 'es6-promise';
export declare class SeatersClient {
    private apiContext;
    constructor(apiPrefix?: string);
    greet(name: string): string;
    getAppEnv(): Promise<any>;
}
