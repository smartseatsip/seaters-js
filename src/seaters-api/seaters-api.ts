import { RequestDriver } from '../api';
import { AppApi } from './app/app-api';
import { FanApi } from './fan/fan-api';
import { AdminApi } from './admin';
import { HealthApi } from './health';
import { AuthenticationApi } from './authentication/authentication-api';
import { TicketingApi } from './ticketing';
import { PaymentApi } from './payment';

import { SeatersApiContext } from './seaters-api-context';

export class SeatersApi {
  public apiContext: SeatersApiContext;
  public app: AppApi;
  public fan: FanApi;
  public authentication: AuthenticationApi;
  public admin: AdminApi;
  public health: HealthApi;
  public ticketing: TicketingApi;
  public payment: PaymentApi;

  constructor(prefix: string, requestDriver: RequestDriver, appKey?: string) {
    this.apiContext = new SeatersApiContext(prefix, requestDriver);
    this.app = new AppApi(this.apiContext, appKey);
    this.fan = new FanApi(this.apiContext);
    this.admin = new AdminApi(this.apiContext);
    this.health = new HealthApi(this.apiContext);
    this.authentication = new AuthenticationApi(this.apiContext);
    this.ticketing = new TicketingApi(this.apiContext);
    this.payment = new PaymentApi(this.apiContext);
  }
}
