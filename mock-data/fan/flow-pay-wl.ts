/**
 * Context: fan is in the WaitingList, with a seat assigned
 * The seat is not yet accepted/payed for. The configured payment system is braintree.
 */
import { generateWl } from './waiting-list';
import { oneHourFromNow, mkMock, Mock, RequestOptions } from './../types';
import { WaitingList, ExtendedPosition, Seat, PositionSalesTransaction, PositionSalesTransactionInput, BraintreeToken } from '../../src/seaters-api/fan';
import { braintreePaymentInfo, realBraintreeToken } from './payment-info';

var position: ExtendedPosition = {
    attendeesInfo: { attendees: [] },
    rank: 42,
    likelihood: '90.00',
    lowLikelihood: false,
    expirationDate: null,


    facialPrice: '10.00',  
    fee: '2.00',
    feeExcVat: '1.80',
    feeVat: '0.20',
    total: '12.00',

    formattedFacialPrice: '10.00 €',
    formattedFee: '2.00 €',
    formattedFeeExcVat: '1.80 €',
    formattedFeeVat: '0.20 €',
    formattedTotal: '12.00 €',
    
    numberOfSeats: 2,
    personalInfoRequired: true,
    status: 'HAS_SEAT',

    transactionStatus: null,
    paymentFailureMessage: null,
};

var seat: Seat = {
    assignmentExpirationDate: oneHourFromNow(),
    deliveryMethod: 'DOWNLOAD',
    exportedVoucherUrl: null,
    seatText: {
        en: 'Go to ticket booth 12 to swap this voucher for a ticket',
        nl: 'Ruil je voucher om aan ticket balie 12'
    },
    status: 'ASSIGNED',
    ticketingSystemType: null,
    voucherNumber: null
};

var wl: WaitingList = generateWl('wlid-flow-pay-wl-braintree', position, seat);

var payed = false;

function payForWl(req: RequestOptions): PositionSalesTransaction {

    if(payed) { throw new Error('[MockData] WL already payed for, please reload your page'); }
    payed = true;

    var input: PositionSalesTransactionInput = JSON.parse(req.body);
    if(!input.braintreePayment || !input.braintreePayment.paymentMethodNonce) {
        throw new Error('[MockData] This flow only supports braintree payments');
    }
    
    var result: PositionSalesTransaction = {
        id: 'a-sales-transaction-id',
        createdDate: new Date().toISOString(),
        lastModifiedDate: new Date().toISOString(),
        paymentFailureMessage: null,
        approvalUrl: null,
        status: 'COMPLETED'// by default - mock accepts any nonce
    };
    
    if(input.braintreePayment.paymentMethodNonce === 'fake-invalid-nonce') {
        result.status = 'FAILURE';
        result.paymentFailureMessage = '[MockData] fake-invalid-nonce was given'
    } else {
        wl.seat.status = 'ACCEPTED';
        wl.seat.voucherNumber = '12345';
    }
    wl.position.transactionStatus = result.status;
    wl.position.paymentFailureMessage = result.paymentFailureMessage;

    return result;
}



export const mocks: Mock[] = [
    
    mkMock('GET', '/api/fan/waiting-lists/wlid-flow-pay-wl-braintree', () => {
        return {
            status: 200,
            statusText: 'OK',
            body: wl
        };
    }),

    mkMock('GET', '/api/fan/waiting-lists/wlid-flow-pay-wl-braintree/position/braintree-token', {
        status: 200,
        statusText: 'OK',
        body: realBraintreeToken,
    }),

    mkMock('POST', '/api/fan/waiting-lists/wlid-flow-pay-wl-braintree/transaction', (req) => {
        return {
            status: 200,
            statusText: 'OK',
            body: payForWl(req)
        };
    }),

    mkMock('GET', '/api/fan/waiting-lists/wlid-flow-pay-wl-braintree/position/payment-info', (req) => {
        return {
            status: 200,
            statusText: 'OK',
            body: braintreePaymentInfo
        };
    }),

]