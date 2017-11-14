import { SeatersApi, SeatersService, PagingOptions, PagedResult } from '../common';
import { payment } from './payment-types';

export class PaymentService extends SeatersService {
  constructor(seatersApi: SeatersApi) {
    super(seatersApi);
  }

  getPaymentSystems(page: PagingOptions): Promise<PagedResult<payment.PaymentSystem>> {
    return this.seatersApi.payment.getPaymentSystems(page).then(r => this.convertPagedResult(r));
  }

  getPaymentSystem(paymentSystemId: string): Promise<payment.PaymentSystem> {
    return this.seatersApi.payment.getPaymentSystem(paymentSystemId);
  }
}
