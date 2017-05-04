import { REQUEST_DRIVER_TYPE, getRequestDriver } from './api';
import { SeatersApi } from './seaters-api';
import { FanService, PublicService, SessionService, AppService } from './services';

export interface SeatersClientOptions {
  apiPrefix: string;
  requestDriver?: REQUEST_DRIVER_TYPE;
  mockData?: any;
}

export class SeatersClient {

  private static DEFAULT_OPTIONS = {
    apiPrefix: '${api.location}',
    requestDriver: 'BROWSER'
  } as SeatersClientOptions;

  public seatersApi: SeatersApi;

  public sessionService: SessionService;

  public appService: AppService;

  public publicService: PublicService;

  public fanService: FanService;

  constructor (options?: SeatersClientOptions) {
    options = Object.assign({}, SeatersClient.DEFAULT_OPTIONS, options);
    let requestDriver = getRequestDriver(options.requestDriver, options.mockData);

    this.seatersApi = new SeatersApi(options.apiPrefix, requestDriver);
    this.sessionService = new SessionService(this.seatersApi);
    this.appService = new AppService(this.seatersApi);
    this.publicService = new PublicService(this.appService, requestDriver, this.seatersApi);
    this.fanService = new FanService(this.seatersApi, this.sessionService, this.publicService);
  }

}

export let getSeatersClient = (() => {
  let client: SeatersClient = undefined;
  return (options?: SeatersClientOptions) => {
    if (!client) {
      client = new SeatersClient(options);
    }
    return client;
  };
})();
