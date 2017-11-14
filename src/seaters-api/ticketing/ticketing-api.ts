/* tslint:disable:no-floating-promises */
import { SeatersApiContext } from '../../seaters-api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { SeatersApiController } from '../seaters-api-controller';
import { TicketingSystem } from './ticketing-types';

export class TicketingApi extends SeatersApiController {
  constructor(private apiContext: SeatersApiContext) {
    super();
  }

  getTicketingSystems(page: PagingOptions): Promise<PagedResult<TicketingSystem>> {
    return this.apiContext.get('/ticketing/systems', null, SeatersApiContext.buildPagingQueryParams(page));
  }

  getTicketingSystem(ticketingSystemId: string): Promise<TicketingSystem> {
    return this.apiContext.get('/ticketing/systems/:id', { id: ticketingSystemId });
  }
}

/* tslint:enable:no-floating-promises */
