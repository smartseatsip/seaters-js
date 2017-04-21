import { SeatersApiContext } from '../../seaters-api';

export class HealthApi {

  constructor (private apiContext: SeatersApiContext) {

  }

  node (): Promise<string> {
    return this.apiContext.doSeatersRequest({
      method: 'GET',
      abstractEndpoint: '/health/node'
    });
  }

}
