import { getSeatersClient } from './seaters-client';
import { JWL_EXIT_STATUS } from './services/join-wl/jwl-flow-service';
import { Promise } from 'es6-promise';

export function joinWl (wlId: string): Promise<JWL_EXIT_STATUS> {
    var client = getSeatersClient();
    return client.jwlFlowService.startFlow(wlId);
}
