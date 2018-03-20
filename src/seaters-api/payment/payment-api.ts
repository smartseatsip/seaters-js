/* tslint:disable:no-floating-promises */
import { SeatersApiContext } from '../../seaters-api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { SeatersApiController } from '../seaters-api-controller';
import { PaymentSystem, PaymentSystemCreateDTO, PaymentSystemUpdateDTO } from './payment-types';

export class PaymentApi extends SeatersApiController {
  constructor(private apiContext: SeatersApiContext) {
    super();
  }

  getPaymentSystems(page: PagingOptions): Promise<PagedResult<PaymentSystem>> {
    return this.apiContext.get('/seaters-admin/payment-systems', null, SeatersApiContext.buildPagingQueryParams(page));
  }

  getPaymentSystem(paymentSystemId: string): Promise<PaymentSystem> {
    return this.apiContext.get('/seaters-admin/payment-systems/:id', { id: paymentSystemId });
  }

  createPaymentSystem(payload: PaymentSystemCreateDTO): Promise<PaymentSystem> {
    return this.apiContext.post('/seaters-admin/payment-systems', payload);
  }

  updatePaymentSystem(paymentSystemId: string, payload: PaymentSystemUpdateDTO): Promise<PaymentSystem> {
    return this.apiContext.put('/seaters-admin/payment-systems/:id', { id: paymentSystemId, ...payload });
  }

  deletePaymentSystem(paymentSystemId: string): Promise<void> {
    return this.apiContext.delete('/seaters-admin/payment-systems/:id', { id: paymentSystemId });
  }
}

/* tslint:enable:no-floating-promises */
