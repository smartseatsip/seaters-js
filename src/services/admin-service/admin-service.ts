import { SeatersApi, PagedResult, PagingOptions, SeatersService } from '../common';
import { admin } from './admin-types';

export class AdminService extends SeatersService {

  constructor (
    seatersApi: SeatersApi
  ) {
    super(seatersApi)
  }

  getFanGroup(fanGroupId: string): Promise<admin.FanGroup> {
    return this.seatersApi.admin.getFanGroup(fanGroupId);
  }

  getFanGroupProtectionCodes (fanGroupId: string, page: PagingOptions): Promise<PagedResult<admin.FanGroupProtectionCode>> {
    return this.seatersApi.admin.getFanGroupProtectionCodes(fanGroupId, page)
      .then(r => this.convertPagedResult(r));
  }

  /**
   * Add a new protection code to a FanGroup
   * @param fanGroupId the id of the fangroup that can be unlocked with the code
   * @param code a text that can be used to unlock the fangroup
   * @param maxTimesUsed use 0 to describe unlimited code
   */
  createFanGroupProtectionCode (fanGroupId: string, code: string, maxTimesUsed: number): Promise<FanGroupProtectionCode> {
    return this.seatersApi.admin.createFanGroupProtectionCode(fanGroupId, code, maxTimesUsed);
  }

  deleteFanGroupProtectionCode (fanGroupId: string, code: string): Promise<any> {
    return this.seatersApi.admin.deleteFanGroupProtectionCode(fanGroupId, code);
  }


}