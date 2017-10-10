import { REQUEST_DRIVER_TYPE, getRequestDriver } from './api';
import { SeatersApi } from './seaters-api';
import { FanService, PublicService, SessionService, AppService, AdminService } from './services';

export type PromiseMiddleware<T> = (promise: Promise<any>) => T;

export interface SeatersClientOptions {
  apiPrefix: string;
  requestDriver?: REQUEST_DRIVER_TYPE;
}

export class SeatersClient {

  private static DEFAULT_OPTIONS = {
    apiPrefix: '${api.location}',
    requestDriver: 'BROWSER'
  } as SeatersClientOptions;

  private seatersApi: SeatersApi;

  public sessionService: SessionService;

  public appService: AppService;

  public publicService: PublicService;

  public fanService: FanService;

  public adminService: AdminService;

  constructor (options?: SeatersClientOptions) {
    options = Object.assign({}, SeatersClient.DEFAULT_OPTIONS, options);
    let requestDriver = getRequestDriver(options.requestDriver);

    this.seatersApi = new SeatersApi(options.apiPrefix, requestDriver);
    this.sessionService = new SessionService(this.seatersApi);
    this.appService = new AppService(this.seatersApi);
    this.publicService = new PublicService(this.appService, requestDriver, this.seatersApi);
    this.fanService = new FanService(this.seatersApi, this.sessionService, this.publicService);
    this.adminService = new AdminService(this.seatersApi);
  }

}

/**
 * Obtain a seaters client. This will only instantiate the client with the given options the first time you invoke it.
 * Calls made after the initial call will return the original instance.
 */
export let getSeatersClient: (options: SeatersClientOptions) => SeatersClient = (() => {
  let client: SeatersClient = undefined;
  return (options?: SeatersClientOptions) => {
    if (!client) {
      client = new SeatersClient(options);
    }
    return client;
  };
})();

export function wrapClient<T> (promiseMiddleware: PromiseMiddleware<T>, client: SeatersClient): SeatersClient {

  let wrappedClient = {
    appService: {},
    fanService: {},
    publicService: {},
    sessionService: {},
    adminService: {}
  } as SeatersClient;

  Object.keys(wrappedClient).forEach((serviceName) => {
    let wrappedService = wrappedClient[serviceName];
    let service = client[serviceName];
    Object.keys(service.__proto__).forEach((propertyName) => {
      let property = service[propertyName];
      if(typeof(property) === 'function') {
        wrappedService[propertyName] = function () {
          let res = property.apply(service, Array.prototype.slice.call(arguments));
          if(res instanceof Promise) {
            return promiseMiddleware(res);
          } else {
            return res;
          }
        };
      } else {
        wrappedService[propertyName] = property;
      }
    });
  });

  return wrappedClient;
}
