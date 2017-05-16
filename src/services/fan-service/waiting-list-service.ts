import { PagedResult } from '../../shared-types';

import { SeatersApi } from '../../seaters-api';
import {
  WaitingList,
  TRANSACTION_STATUS,
  PositionSalesTransactionInput,
  AttendeesInfo,
  AttendeeInfo,
  EVENT_REQUIRED_ATTENDEE_INFO,
  TICKETING_SYSTEM_TYPE
} from '../../seaters-api/fan';
import { fan } from './fan-types';
import { retryUntil, compareObjects } from './../util';

let WAITING_LIST_ACTION_STATUS = fan.WAITING_LIST_ACTION_STATUS;

let EXPORTABLE_TICKETING_SYSTEMS: TICKETING_SYSTEM_TYPE[] = ['UPLOAD', 'DIGITICK'];

export class WaitingListService {

  constructor (private api: SeatersApi) {

  }

  canPay (wl: fan.WaitingList): boolean {
    if (WAITING_LIST_ACTION_STATUS.WAIT === wl.actionStatus) {
      return !!wl.position.expirationDate;
    } else if (WAITING_LIST_ACTION_STATUS.CONFIRM === wl.actionStatus) {
      return !wl.position.transactionStatus || wl.position.transactionStatus === 'FAILURE';
    } else {
      return false;
    }
  }

  hasPaymentInProgress (wl: fan.WaitingList): boolean {
    if (!wl.position) {
      return false;
    } else {
      return ['CREATING', 'CREATED', 'APPROVED', 'CANCELLED', 'REFUNDING']
          .indexOf(wl.position.transactionStatus) >= 0;
    }
  }

  hasPreviousPayment (wl: fan.WaitingList): boolean {
    return !!(wl.position && wl.position.transactionStatus);
  }

  extendRawWaitingList (wl: WaitingList): fan.WaitingList {
    return Object.assign(wl, {
      actionStatus: this.getWaitingListActionStatus(wl),
      // (T)ODO: pending status
      shouldProvideAttendeesInfo: this.shouldProvideAttendeesInfo(wl),
      processing: undefined
    });
  }

  extendRawWaitingLists (wls: PagedResult<WaitingList>): PagedResult<fan.WaitingList> {
    wls.items = wls.items.map(wl => this.extendRawWaitingList(wl));
    return wls as PagedResult<fan.WaitingList>;
  }

  getWaitingList (waitingListId: string): Promise<fan.WaitingList> {
    return this.getRawWaitingList(waitingListId)
      .then((wl) => this.extendRawWaitingList(wl));
  }

  getWaitingLists (waitingListIds: string[]): Promise<fan.WaitingList[]> {
    return this.api.fan.waitingLists(waitingListIds)
      .then(wls => wls.map(wl => this.extendRawWaitingList(wl)));
  }

  joinWaitingList (waitingListId: string, numberOfSeats: number): Promise<fan.WaitingList> {
    return this.api.fan.joinWaitingList(waitingListId, numberOfSeats)
      .then(() => this.pollWaitingList(waitingListId, (wl) => wl.actionStatus !== WAITING_LIST_ACTION_STATUS.BOOK));
  }

  leaveWaitingList (waitingListId: string): Promise<fan.WaitingList> {
    return this.api.fan.leaveWaitingList(waitingListId)
    // wait until the status is returned to BOOK
      .then(() => this.pollWaitingList(waitingListId, (wl) => wl.actionStatus === WAITING_LIST_ACTION_STATUS.BOOK));
  }

  getWaitingListPrice (waitingListId: string, numberOfSeats: number): Promise<fan.Price> {
    return this.api.fan.waitingListPrice(waitingListId, numberOfSeats);
  }

  acceptSeats (waitingListId: string): Promise<fan.WaitingList> {
    return this.api.fan.acceptSeats(waitingListId)
      .then(() => this.waitUntilCanGoLive(waitingListId));
  }

  rejectSeats (waitingListId: string): Promise<fan.WaitingList> {
    return this.api.fan.rejectSeats(waitingListId)
      .then(() => this.pollWaitingList(waitingListId, (wl) => (wl.actionStatus === WAITING_LIST_ACTION_STATUS.BOOK || wl.actionStatus === WAITING_LIST_ACTION_STATUS.UNLOCK)));
  }

  exportSeats (waitingListId: string): Promise<fan.WaitingList> {
    return this.waitUntilSeatsCanBeExported(waitingListId)
      .then(() => this.api.fan.exportSeats(waitingListId))
      .then(() => this.pollWaitingList(waitingListId, (wl) => (wl && wl.seat && wl.seat.exportedVoucherUrl && wl.seat.exportedVoucherUrl.length > 0)));
  }

  payPosition (waitingListId: string, transaction: PositionSalesTransactionInput): Promise<fan.WaitingList> {
    return this.submitTransaction(waitingListId, transaction)
    // wait for WL state to be 'GO_LIVE'
      .then(() => this.waitUntilCanGoLive(waitingListId));
  }

  preauthorizePosition (waitingListId: string, transaction: PositionSalesTransactionInput): Promise<fan.WaitingList> {
    return this.submitTransaction(waitingListId, transaction)
    // wait for preauthorization timer to be removed
      .then(() => this.pollWaitingList(waitingListId, wl => {
        return (wl.position.expirationDate as any) === null;
      }));
  }

  saveAttendeesInfo (waitingListId: string, attendeesInfo: AttendeesInfo): Promise<fan.WaitingList> {
    return this.api.fan.updateAttendeesInfo(waitingListId, attendeesInfo)
    // wait for attendeeInfo to be updated in CQRS
      .then(() => this.pollWaitingList(waitingListId, wl => {
        let storedAttendees = (wl.position.attendeesInfo && wl.position.attendeesInfo.attendees) || [];
        // every attendee must be found in the stored attendees
        // console.log('storedAttendees', storedAttendees);
        // console.log('input attendees', attendeesInfo.attendees);
        return attendeesInfo.attendees.every(attendee => !!storedAttendees.find(storedAttendee => {
          return compareObjects(attendee, storedAttendee, {
            ignoreNullFields: true,
            ignoreUndefinedFields: true,
            looseComparison: false
          });
        }));
      }));
  }

  joinProtectedWaitingList (waitingListId: string, code: string): Promise<fan.WaitingList> {
    return this.getWaitingList(waitingListId)
      .then(wl => this.api.fan.joinProtectedWaitingList(wl, code))
      // wait for request to be ACCEPTED
      .then(() => this.pollWaitingList(waitingListId, (wl) => this.checkUnlockStatus(wl)))
      // wait for action status CAN_LEAVE
      .then(() => this.pollWaitingList(waitingListId, (wl) => wl.actionStatus !== WAITING_LIST_ACTION_STATUS.UNLOCK));
  }

  private checkUnlockStatus (wl: fan.WaitingList) {
    if (!wl.request) {
      console.error('[WaitingListService] checkUnlockStatus - no request made');
      // tslint:disable-next-line
      throw 'strs.api.servererror';
    } else if (wl.request.status === 'PENDING') {
      return false;
    } else if (wl.request.status === 'ACCEPTED') {
      return true;
    } else if (wl.request.status === 'REJECTED') {
      console.warn('[WaitingListService] checkUnlockStatus - code rejected');
      // tslint:disable-next-line
      throw 'strs.api.wl.invalidcode';
    } else {
      console.error('[WaitingListService] checkUnlockStatus - unknown status');
      // tslint:disable-next-line
      throw 'strs.api.servererror';
    }
  }

  private getRawWaitingList (waitingListId: string): Promise<WaitingList> {
    return this.api.fan.waitingList(waitingListId);
  }

  private pollWaitingList (
    waitingListId: string,
    condition: (wl: fan.WaitingList) => boolean,
    limit?: number,
    delayInMs?: number
  ): Promise<fan.WaitingList> {
    return retryUntil<fan.WaitingList>(
      () => this.getWaitingList(waitingListId),
      condition,
      limit || 10,
      delayInMs || 1000
    );
  }

  private getWaitingListActionStatus (waitingList: WaitingList): fan.WAITING_LIST_ACTION_STATUS {
    let seat = waitingList.seat;
    let position = waitingList.position;
    let request = waitingList.request;

    // Comming soon
    if (waitingList.waitingListStatus === 'PUBLISHED') {
      return WAITING_LIST_ACTION_STATUS.SOON;
    }

    // Not in WL
    if (!position) {
      // Code protected WL
      if (waitingList.accessMode === 'CODE_PROTECTED') {
        if (!request) {
          return WAITING_LIST_ACTION_STATUS.UNLOCK;
        } else if (request.status === 'PENDING') {
          return WAITING_LIST_ACTION_STATUS.UNLOCK;// (-)PENDING
        } else if (request.status === 'REJECTED') {
          return WAITING_LIST_ACTION_STATUS.UNLOCK;
        } else if (request.status === 'ACCEPTED') {
          return WAITING_LIST_ACTION_STATUS.BOOK;
        } else {
          console.error('[WaitingListService] - unexpected request status: %s', request.status);
          return WAITING_LIST_ACTION_STATUS.ERROR;
        }
      } else if (waitingList.accessMode === 'PUBLIC') {
        // Public WL
        return WAITING_LIST_ACTION_STATUS.BOOK;
      } else {
        console.error('[WaitingListService] - unexpected accessMode: %s', waitingList.accessMode);
        return WAITING_LIST_ACTION_STATUS.ERROR;
      }
    }

    // In WL
    if (position.status === 'WAITING_SEAT') {
      return WAITING_LIST_ACTION_STATUS.WAIT;
    }

    // In WL with seat
    if (position.status === 'HAS_SEAT') {
      if (seat) {
        if (seat.status === 'ASSIGNED') {
          // free WL
          if (waitingList.freeWaitingList) {
            return WAITING_LIST_ACTION_STATUS.CONFIRM;
          } else if (!position.transactionStatus) {
            // non free WL
            // no payment yet
            return WAITING_LIST_ACTION_STATUS.CONFIRM;
          } else if (['FAILURE', 'CANCELLED', 'REFUNDED'].indexOf(position.transactionStatus) >= 0) {
            // failed payment
            return WAITING_LIST_ACTION_STATUS.CONFIRM;
          } else if (['CREATING', 'CREATED', 'APPROVED', 'REFUNDING'].indexOf(position.transactionStatus) >= 0) {
            // payment in progress
            return WAITING_LIST_ACTION_STATUS.CONFIRM;// (-)PENDING
          } else {
            console.error('[WaitingListService] - unexpected transactionStatus: %s', position.transactionStatus);
            return WAITING_LIST_ACTION_STATUS.ERROR;
          }
        } else if (waitingList.seatDistributionMode === 'TICKET' && seat.ticketingSystemType) {
          // non-voucher - tickets are being requested
          return WAITING_LIST_ACTION_STATUS.CONFIRM;// (-)PENDING
        } else if (seat.status === 'ACCEPTED') {
          // go live
          return WAITING_LIST_ACTION_STATUS.GO_LIVE;
        } else {
          console.error('[WaitingListService] unexpected seat status: %s', seat.status);
          return WAITING_LIST_ACTION_STATUS.ERROR;
        }
      } else {
        console.error('[WaitingListService] has seat without actual seat');
        return WAITING_LIST_ACTION_STATUS.ERROR;
      }
    } else if (position.status === 'BEING_PROCESSED') {
      return WAITING_LIST_ACTION_STATUS.WAIT;// (-)PENDING
    } else {
      console.error('[WaitinglistService] unexpected position status: %s', position.status);
      return WAITING_LIST_ACTION_STATUS.ERROR;
    }

  }

  private hasVoucher (wl: fan.WaitingList): boolean {
    return wl.seatDistributionMode === 'VOUCHER'
      && wl.seat
      && wl.seat.voucherNumber
      && wl.seat.voucherNumber !== '';
  }

  private hasTicket (wl: fan.WaitingList): boolean {
    return wl.seatDistributionMode === 'TICKET'
      && wl.seat
      && !!wl.seat.ticketingSystemType;
  }

  private seatsCanBeExported (wl: fan.WaitingList): boolean {
    if (!(this.hasVoucher(wl) || this.hasTicket(wl))) {
      return false;
    }
    switch (wl.seatDistributionMode) {
      case 'VOUCHER':
        return true;
      case 'TICKET':
        let ts = wl.seat.ticketingSystemType;
        if (EXPORTABLE_TICKETING_SYSTEMS.indexOf(ts) < 0) {
          throw new Error('Ticketing system type "' + ts + '" does not support exporting tickets');
        }
        return true;
      default:
        throw new Error('Unknown WL seatDistributionMode ' + JSON.stringify(wl.seatDistributionMode));
    }
  }

  private waitUntilCanGoLive (waitingListId: string): Promise<fan.WaitingList> {
    return this.pollWaitingList(waitingListId, wl => {
      return wl.actionStatus === WAITING_LIST_ACTION_STATUS.GO_LIVE;
    });
  }

  private waitUntilSeatsCanBeExported (waitingListId: string): Promise<fan.WaitingList> {
    return this.pollWaitingList(waitingListId, (wl) => this.seatsCanBeExported(wl), 60, 1000);
  }

  private shouldProvideAttendeesInfo (wl: WaitingList): boolean {
    if (!wl.eventRequiredAttendeeInfo || wl.eventRequiredAttendeeInfo.length === 0) {
      // if no info is asked, we don't need to ask for attendee info
      return false;
    } else {
      // check that all attendee info was stored; if it's stored it
      // must has passed the serverside validations.
      return !! (
        wl.position &&
        wl.position.attendeesInfo &&
        wl.position.attendeesInfo.attendees &&
        wl.position.attendeesInfo.attendees.length !== wl.position.numberOfSeats
      );
    }
  }

  private submitTransaction (
    waitingListId: string,
    transaction: PositionSalesTransactionInput
  ): Promise<fan.WaitingList> {
    return this.getWaitingList(waitingListId)
      .then(wl => this.ensureFanCanPayPosition(wl))
      .then(wl => this.removePreviousTransactionIfAny(wl))
      .then(wl => this.createTransaction(waitingListId, transaction))
      .then(undefined, err => {
        console.error('[WaitingListService] submitTransaction failed: %s', err, transaction);
        throw err;
      });
  }

  private ensureFanCanPayPosition (wl: fan.WaitingList): Promise<fan.WaitingList> {
    if (!this.canPay(wl)) {
      throw new Error('Trying to submit transaction for WL that is not in a state that requires payment');
    } else if (this.hasPaymentInProgress(wl)) {
      throw new Error('Trying to submit transaction for WL which has a payment in progress');
    } else {
      return Promise.resolve(wl);
    }
  }

  private removePreviousTransactionIfAny (wl: fan.WaitingList): Promise<fan.WaitingList> {
    if (!this.hasPreviousPayment(wl)) {
      return Promise.resolve(wl);
    }
    return this.api.fan.deletePositionSalesTransaction(wl.waitingListId)
      .then(() => {
        return this.pollWaitingList(
          wl.waitingListId,
          (wl) => this.hasPreviousPayment(wl),
          60,
          1000
        );
      });
  }

  private createTransaction (
    waitingListId: string,
    transaction: PositionSalesTransactionInput
  ): Promise<fan.WaitingList> {
    return this.api.fan.createPositionSalesTransaction(waitingListId, transaction)
      .then(() => {
        return this.pollWaitingList(
          waitingListId,
          wl => this.hasProcessedPayment(wl),
          60,
          1000
        );
      });
  }

  private hasProcessedPayment (wl: fan.WaitingList): boolean {
    return wl.position && ['FAILURE', 'COMPLETED'].indexOf(wl.position.transactionStatus) >= 0;
  }

}
