import { getSeatersClient } from './seaters-client';

export function joinWl (wlId: string) {
    var client = getSeatersClient();
    return client.joinWlService.joinWl(wlId);
}
