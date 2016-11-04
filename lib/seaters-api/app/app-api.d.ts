import { ApiContext } from '../../api';
import { Env } from './env';
export declare class AppApi {
    private apiContext;
    constructor(apiContext: ApiContext);
    env(): Promise<Env>;
}
