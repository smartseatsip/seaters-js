import { Promise } from 'es6-promise';
import { Object } from 'core-js/library';

import { RequestDriver, REQUEST_DRIVER_TYPE, getRequestDriver } from './api';
import { SeatersApi } from './seaters-api';
import { FanService, PublicService, SessionService, AppService } from './services';
import { AlgoliaForSeatersService } from './services/algolia-for-seaters/algolia-for-seaters-service';

export interface SeatersClientOptions {
  apiPrefix: string,
  requestDriver?: REQUEST_DRIVER_TYPE,
  mockData?: any
}

export class SeatersClient {

  private static DEFAULT_OPTIONS = <SeatersClientOptions> {
    apiPrefix: '${api.location}',
    requestDriver: 'BROWSER'
  }

  public seatersApi: SeatersApi;

  public sessionService : SessionService;

  public appService: AppService;

  public publicService: PublicService;

  public fanService: FanService;

  constructor (options?: SeatersClientOptions) {
    options = Object.assign({}, SeatersClient.DEFAULT_OPTIONS, options);
    var requestDriver = getRequestDriver(options.requestDriver, options.mockData);

    this.seatersApi = new SeatersApi(options.apiPrefix, requestDriver);
    this.sessionService = new SessionService(this.seatersApi);
    this.appService = new AppService(this.seatersApi);
    this.publicService = new PublicService(this.appService, requestDriver, this.seatersApi);
    this.fanService = new FanService(this.seatersApi, this.sessionService, this.publicService);
  }

}

export var getSeatersClient = (() => {
  var client: SeatersClient = undefined;
  return (options?: SeatersClientOptions) => {
    if(client === undefined) {
      client = new SeatersClient(options);
    }
    return client;
  };
})();
