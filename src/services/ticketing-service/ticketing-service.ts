import { PagedResult, PagingOptions, SeatersApi, SeatersService } from '../common';
import { ticketing } from './ticketing-types';

export class TicketingService extends SeatersService {
  constructor(seatersApi: SeatersApi) {
    super(seatersApi);
  }

  getTicketingSystems(page: PagingOptions): Promise<PagedResult<ticketing.TicketingSystem>> {
    return this.seatersApi.ticketing.getTicketingSystems(page).then(r => this.convertPagedResult(r));
  }

  getTicketingSystem(ticketingSystemId: string): Promise<ticketing.TicketingSystem> {
    return this.seatersApi.ticketing.getTicketingSystem(ticketingSystemId);
  }
}
