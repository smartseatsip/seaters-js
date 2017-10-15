import { REQUEST_DRIVER_TYPE, getRequestDriver } from './api';
import { SeatersApi } from './seaters-api';
import {
  FanService,
  PublicService,
  SessionService,
  AppService,
  AdminService,
  TicketingService,
  PaymentService
} from './services';

export type PromiseMiddleware<T> = (promise: Promise<any>) => T;

export interface SeatersClientOptions {
  apiPrefix: string;
  requestDriver?: REQUEST_DRIVER_TYPE;
}

export class SeatersClient {
  public sessionService: SessionService;

  public appService: AppService;

  public publicService: PublicService;

  public fanService: FanService;

  public adminService: AdminService;

  public ticketingService: TicketingService;

  public paymentService: PaymentService;

  private seatersApi: SeatersApi;

  constructor(options?: SeatersClientOptions) {
    options = { ...SeatersClient.DEFAULT_OPTIONS, ...options };
    const requestDriver = getRequestDriver(options.requestDriver);

    this.seatersApi = new SeatersApi(options.apiPrefix, requestDriver);
    this.sessionService = new SessionService(this.seatersApi);
    this.appService = new AppService(this.seatersApi);
    this.publicService = new PublicService(this.appService, requestDriver, this.seatersApi);
    this.fanService = new FanService(this.seatersApi, this.sessionService, this.publicService);
    this.adminService = new AdminService(this.seatersApi);
    this.ticketingService = new TicketingService(this.seatersApi);
    this.paymentService = new PaymentService(this.seatersApi);
  }

  private static DEFAULT_OPTIONS = {
    // tslint:disable-next-line
    apiPrefix: '${api.location}',
    requestDriver: 'BROWSER'
  } as SeatersClientOptions;
}

/**
 * Obtain a seaters client. This will only instantiate the client with the given options the first time you invoke it.
 * Calls made after the initial call will return the original instance.
 */
export let getSeatersClient: (options: SeatersClientOptions) => SeatersClient = (() => {
  let client: SeatersClient;
  return (options?: SeatersClientOptions) => {
    if (!client) {
      client = new SeatersClient(options);
    }
    return client;
  };
})();

export function wrapClient<T>(promiseMiddleware: PromiseMiddleware<T>, client: SeatersClient): SeatersClient {
  const wrappedClient = {
    appService: {},
    fanService: {},
    publicService: {},
    sessionService: {},
    adminService: {},
    ticketingService: {},
    paymentService: {}
  } as SeatersClient;

  // tslint:disable-next-line
  Object.keys(wrappedClient).forEach(function(serviceName) {
    const wrappedService = wrappedClient[serviceName];
    const service = client[serviceName];
    // tslint:disable-next-line
    Object.keys(service.__proto__).forEach(function(propertyName) {
      const property = service[propertyName];
      if (typeof property === 'function') {
        // tslint:disable-next-line
        wrappedService[propertyName] = function() {
          const res = property.apply(service, Array.prototype.slice.call(arguments));
          if (res instanceof Promise) {
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
