import { SeatersApi, PagedResult, PagingOptions, SeatersService } from '../common';
import { admin } from './admin-types';
import { mapWaitingList } from './waiting-list-mapper';

export class AdminService extends SeatersService {
  constructor(seatersApi: SeatersApi) {
    super(seatersApi);
  }

  getFanGroup(fanGroupId: string): Promise<admin.FanGroup> {
    return this.seatersApi.admin.getFanGroup(fanGroupId);
  }

  getFanGroupProtectionCodes(
    fanGroupId: string,
    page: PagingOptions
  ): Promise<PagedResult<admin.FanGroupProtectionCode>> {
    return this.seatersApi.admin.getFanGroupProtectionCodes(fanGroupId, page).then(r => this.convertPagedResult(r));
  }

  getFanGroupWaitingLists(fanGroupId: string, page: PagingOptions): Promise<PagedResult<admin.WaitingList>> {
    return this.seatersApi.admin.getFanGroupWaitingLists(fanGroupId, page).then(r => this.convertPagedResult(r));
  }

  getWaitingList(waitingListId: string): Promise<admin.WaitingList> {
    return this.seatersApi.admin.getWaitingList(waitingListId);
  }

  updateWaitingList(waitingList: admin.WaitingList): Promise<admin.WaitingList> {
    return this.seatersApi.admin.updateWaitingList(mapWaitingList(waitingList));
  }

  deleteWaitingList(waitingListId: string): Promise<any> {
    return this.seatersApi.admin.deleteWaitingList(waitingListId);
  }

  /**
   * Add a new protection code to a FanGroup
   * @param fanGroupId the id of the fangroup that can be unlocked with the code
   * @param code a text that can be used to unlock the fangroup
   * @param maxTimesUsed use 0 to describe unlimited code
   */
  createFanGroupProtectionCode(
    fanGroupId: string,
    code: string,
    maxTimesUsed: number
  ): Promise<admin.FanGroupProtectionCode> {
    return this.seatersApi.admin.createFanGroupProtectionCode(fanGroupId, code, maxTimesUsed);
  }

  deleteFanGroupProtectionCode(fanGroupId: string, code: string): Promise<any> {
    return this.seatersApi.admin.deleteFanGroupProtectionCode(fanGroupId, code);
  }

  /**
   * Import protection codes into a FanGroup. This upload should be a CSV with following format:
   * - column 1: the actual code that can unlock the FG
   * - column 2: how many times the code can be used - use 0 for infinite usage 
   * @param fanGroupId The FG to import codes into
   * @param data For browser an HTMLInputElement containing a file, node: not supported
   */
  importFanGroupProtectionCodes(fanGroupId: string, data: any, fileName?: string): Promise<any> {
    return this.uploadOneTimeFile(data, fileName).then(otf => {
      return this.seatersApi.admin.importFanGroupProtectionCodes(fanGroupId, otf.fileId);
    });
  }

  updateFanGroupBackgroundImage(fanGroupId: string, data: any, fileName?: string): Promise<admin.FanGroup> {
    return this.seatersApi.admin
      .requestFanGroupBackgroundImageUpload(fanGroupId, this.defaultFileName(fileName))
      .then(otf => this.seatersApi.admin.uploadOneTimeFile(otf.url, data))
      .then(() => this.getFanGroup(fanGroupId));
  }

  updateFanGroupCoverImage(fanGroupId: string, data: any, fileName?: string): Promise<admin.FanGroup> {
    return this.seatersApi.admin
      .requestFanGroupCoverImageUpload(fanGroupId, this.defaultFileName(fileName))
      .then(otf => this.seatersApi.admin.uploadOneTimeFile(otf.url, data))
      .then(() => this.getFanGroup(fanGroupId));
  }

  updateFanGroupProfileImage(fanGroupId: string, data: any, fileName?: string): Promise<admin.FanGroup> {
    return this.seatersApi.admin
      .requestFanGroupProfileImageUpload(fanGroupId, this.defaultFileName(fileName))
      .then(otf => this.seatersApi.admin.uploadOneTimeFile(otf.url, data))
      .then(() => this.getFanGroup(fanGroupId));
  }

  private uploadOneTimeFile(data: any, fileName?: string): Promise<admin.OneTimeFile> {
    return this.seatersApi.admin
      .requestOneTimeFileUpload(this.defaultFileName(fileName))
      .then(otf => this.seatersApi.admin.uploadOneTimeFile(otf.url, data).then(() => otf));
  }

  private defaultFileName(fileName?: string): string {
    if (fileName && fileName !== '') {
      return fileName;
    } else {
      return new Date().toISOString();
    }
  }
}
