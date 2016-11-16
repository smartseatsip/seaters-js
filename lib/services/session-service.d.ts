import { SeatersApi } from '../seaters-api';
import { UserData } from '../seaters-api/authentication/token';
import { Promise } from 'es6-promise';
export declare enum SESSION_STRATEGY {
    EXPIRE = 0,
}
export declare class SessionService {
    private api;
    private sessionStrategy;
    private currentUser;
    constructor(api: SeatersApi, sessionStrategy?: SESSION_STRATEGY);
    private applyExpireSessionStrategy(token);
    private finishLogin(tokenOutput);
    doEmailPasswordLogin(email: string, password: string, mfaToken?: string): Promise<UserData>;
    doLogout(): void;
    doEmailPasswordSignUp(email: string, password: string, firstname: string, lastname: string, language?: string): Promise<UserData>;
    doValidation(email: string, code: string): Promise<UserData>;
    whoami(): UserData;
}
