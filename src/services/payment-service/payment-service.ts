import { PagedResult, PagingOptions, SeatersApi, SeatersService } from '../common';
import { payment } from './payment-types';

export class PaymentService extends SeatersService {
  constructor(seatersApi: SeatersApi) {
    super(seatersApi);
  }

  getPaymentSystems(page: PagingOptions): Promise<PagedResult<payment.PaymentSystem>> {
    return this.seatersApi.payment
      .getPaymentSystems(page)
      .then(r => this.convertPagedResult(r))
      .then(r => {
        r.items = r.items.map(paymentSystem => {
          paymentSystem.configuration = this.expandJSONStringToObject(paymentSystem.configuration);
          return paymentSystem;
        });

        return r;
      });
  }

  getPaymentSystem(paymentSystemId: string): Promise<payment.PaymentSystem> {
    return this.seatersApi.payment.getPaymentSystem(paymentSystemId).then(paymentSystem => {
      paymentSystem.configuration = this.expandJSONStringToObject(paymentSystem.configuration);
      return paymentSystem;
    });
  }

  createPaymentSystem(payload: payment.PaymentSystemCreateDTO): Promise<payment.PaymentSystem> {
    payload.configuration = this.flattenObjectToJSONString(payload.configuration);

    return this.seatersApi.payment.createPaymentSystem(payload).then(paymentSystem => {
      paymentSystem.configuration = this.expandJSONStringToObject(paymentSystem.configuration);
      return paymentSystem;
    });
  }

  updatePaymentSystem(
    paymentSystemId: string,
    payload: payment.PaymentSystemUpdateDTO
  ): Promise<payment.PaymentSystem> {
    payload.configuration = this.flattenObjectToJSONString(payload.configuration);

    return this.seatersApi.payment.updatePaymentSystem(paymentSystemId, payload).then(paymentSystem => {
      paymentSystem.configuration = this.expandJSONStringToObject(paymentSystem.configuration);
      return paymentSystem;
    });
  }

  deletePaymentSystem(paymentSystemId: string): Promise<void> {
    return this.seatersApi.payment.deletePaymentSystem(paymentSystemId);
  }

  private flattenObjectToJSONString(
    data: { [key: string]: string } | { [key: string]: any }
  ): { [key: string]: string } {
    if (!data || Object.keys(data).length === 0) {
      return data;
    }

    const flatData = { ...data };
    const keys = Object.keys(data);

    /* tslint:disable prefer-for-of */
    for (let i = 0; i < keys.length; i++) {
      if (typeof data[keys[i]] === 'object' && !Array.isArray(data[keys[i]])) {
        let jsonValue;
        try {
          jsonValue = JSON.stringify(data[keys[i]]);
        } catch (e) {
          jsonValue = data[keys[i]];
        }
        flatData[keys[i]] = jsonValue;
      }
    }
    /* tslint:enable prefer-for-of */

    return flatData;
  }

  private expandJSONStringToObject(data: { [key: string]: string } | { [key: string]: any }): { [key: string]: any } {
    if (!data || Object.keys(data).length === 0) {
      return data;
    }

    const expandedData = { ...data };
    const keys = Object.keys(data);

    /* tslint:disable prefer-for-of */
    for (let i = 0; i < keys.length; i++) {
      if (typeof data[keys[i]] === 'string') {
        let object;
        try {
          object = JSON.parse(data[keys[i]]);
        } catch (e) {
          object = data[keys[i]];
        }
        expandedData[keys[i]] = object;
      }
    }
    /* tslint:enable prefer-for-of */

    return expandedData;
  }
}
