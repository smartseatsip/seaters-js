import { SeatersApi } from '../../seaters-api';
import { Promise } from 'es6-promise';
import { app } from './app-types';
import { HEALTH_NODE_OK } from '../../seaters-api/health/health-types';

export class AppService {

  private envP: Promise<app.Env>;

  constructor (private seatersApi: SeatersApi) {
  }

  getEnv (): Promise<app.Env> {
    if (this.envP === undefined) {
      this.envP = this.seatersApi.app.env();
    }
    return this.envP;
  }

  isInMaintenance (): Promise<boolean> {
    return this.seatersApi.health.node()
      .then(msg => msg !== HEALTH_NODE_OK)
      .catch(err => {
        console.error('Seaters API under maintenance', err);
        return true;
      });
  }

}
