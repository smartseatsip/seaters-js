import { SeatersApi } from '../seaters-api';
import { UserData } from '../seaters-api/authentication/token';
import { Promise } from 'es6-promise';
export declare enum SESSION_STRATEGY {
    AUTORENEW = 0,
    EXPIRE = 1,
}
export declare class SessionService {
    private api;
    private sessionStrategy;
    private currentUser;
    constructor(api: SeatersApi, sessionStrategy?: SESSION_STRATEGY);
    private applyAutorenewSessionStrategy(token);
    private applyExpireSessionStrategy(token);
    private finishLogin(tokenOutput);
    doEmailPasswordLogin(email: string, password: string, mfaToken?: string): Promise<UserData>;
    doLogout(): void;
    whoami(): UserData;
}
