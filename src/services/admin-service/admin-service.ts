import { SeatersApi, PagedResult, PagingOptions, SeatersService } from '../common';
import { admin } from './admin-types';
import { mapWaitingList } from './waiting-list-mapper';
import { profiling } from '../index';

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

  // Profiling
  getCategories(options: PagingOptions): Promise<PagedResult<profiling.ProfilingCategory>> {
    return this.seatersApi.admin.getCategories(options).then(r => this.convertPagedResult(r));
  }

  getCategory(id: string): Promise<profiling.ProfilingCategory> {
    return this.seatersApi.admin.getCategory(id);
  }

  createCategory(category: profiling.ProfilingCategory): Promise<profiling.ProfilingCategory> {
    return this.seatersApi.admin.createCategory(category);
  }

  updateCategory(category: profiling.ProfilingCategory): Promise<profiling.ProfilingCategory> {
    return this.seatersApi.admin.updateCategory(category);
  }

  deleteCategory(id: string): Promise<any> {
    return this.seatersApi.admin.deleteCategory(id);
  }

  orderCategories(orderedCategoryIds: string[]): Promise<any> {
    return this.seatersApi.admin.orderCategories(orderedCategoryIds);
  }

  getInterests(options: PagingOptions): Promise<PagedResult<profiling.ProfilingCategory>> {
    return this.seatersApi.admin.getInterests(options).then(r => this.convertPagedResult(r));
  }

  getInterest(id: string): Promise<profiling.ProfilingInterest> {
    return this.seatersApi.admin.getInterest(id);
  }

  createInterest(interest: profiling.ProfilingInterest): Promise<profiling.ProfilingInterest> {
    return this.seatersApi.admin.createInterest(interest);
  }

  updateInterest(interest: profiling.ProfilingInterest): Promise<profiling.ProfilingInterest> {
    return this.seatersApi.admin.updateInterest(interest);
  }

  deleteInterest(id: string): Promise<any> {
    return this.seatersApi.admin.deleteInterest(id);
  }

  getFanAttributes(options: PagingOptions): Promise<PagedResult<profiling.ProfilingFanAttribute>> {
    return this.seatersApi.admin.getFanAttributes(options).then(r => this.convertPagedResult(r));
  }

  getFanAttribute(id: string): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.admin.getFanAttribute(id);
  }

  createFanAttribute(fanAttribute: profiling.ProfilingFanAttribute): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.admin.createFanAttribute(fanAttribute);
  }

  updateFanAttribute(fanAttribute: profiling.ProfilingFanAttribute): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.admin.updateFanAttribute(fanAttribute);
  }

  deleteFanAttribute(id: string): Promise<any> {
    return this.seatersApi.admin.deleteFanAttribute(id);
  }

  validateFanAttribute(id: string): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.admin.validateFanAttribute(id);
  }

  addAliases(id: string, idsToConvert: string[]): Promise<profiling.ProfilingFanAttribute> {
    return this.seatersApi.admin.addAliases(id, idsToConvert);
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
