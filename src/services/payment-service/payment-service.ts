import { PagedResult, PagingOptions, SeatersApi, SeatersService } from '../common';
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

  createPaymentSystem(paymentSystem: payment.PaymentSystemCreateDTO): Promise<payment.PaymentSystem> {
    return this.seatersApi.payment.createPaymentSystem(paymentSystem);
  }

  updatePaymentSystem(
    paymentSystemId: string,
    paymentSystem: payment.PaymentSystemUpdateDTO
  ): Promise<payment.PaymentSystem> {
    return this.seatersApi.payment.updatePaymentSystem(paymentSystemId, paymentSystem);
  }

  deletePaymentSystem(paymentSystemId: string): Promise<void> {
    return this.seatersApi.payment.deletePaymentSystem(paymentSystemId);
  }
}
