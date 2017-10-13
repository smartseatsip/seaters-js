/* tslint:disable:no-floating-promises */
import { SeatersApiContext } from '../../seaters-api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { SeatersApiController } from '../seaters-api-controller';
import {
  User, UserSearchQuery, FanGroupOwnership, FanGroup,
  FanGroupProtectionCode, OneTimeFile
} from './admin-types';

export class AdminApi extends SeatersApiController {

  constructor (private apiContext: SeatersApiContext) {
    super();
  }

  getUsers (page: PagingOptions): Promise<PagedResult<User>> {
    return this.apiContext.get(
      '/seaters-admin/users',
      null,
      SeatersApiContext.buildPagingQueryParams(page)
    );
  }

  searchUsers (query: UserSearchQuery, page: PagingOptions): Promise<PagedResult<User>> {
    return this.apiContext.put(
      '/seaters-admin/users',
      query,
      null,
      SeatersApiContext.buildPagingQueryParams(page)
    );
  }

  getUser (id: string): Promise<User> {
    return this.apiContext.get(
      '/seaters-admin/users/:id',
      { id: id }
    );
  }

  updateUser (user: User): Promise<User> {
    return this.apiContext.put(
      '/seaters-admin/users/:id',
      user,
      { id: user.id }
    );
  }

  deleteUser (id: string): Promise<User> {
    return this.apiContext.delete(
      '/seaters-admin/users/:id',
      { id: id }
    );
  }

  createUser (user: User): Promise<User> {
    return this.apiContext.post(
      '/seaters-admin/users',
      user
    );
  }

  getUserOwnerships (userId: string, page: PagingOptions): Promise<PagedResult<FanGroupOwnership>> {
    return this.apiContext.get(
      '/seaters-admin/users/:id/ownerships',
      null,
      SeatersApiContext.buildPagingQueryParams(page)
    );
  }

  createUserOwnership (ownership: FanGroupOwnership): Promise<FanGroupOwnership> {
    return this.apiContext.post(
      '/seaters-admin/users/:id/ownerships',
      ownership,
      { id: ownership.userId }
    );
  }

  deleteUserOwnership (ownership: FanGroupOwnership): Promise<FanGroupOwnership> {
    return this.apiContext.delete(
      '/seaters-admin/users/:userId/ownerships/:fanGroupId',
      { userId: ownership.userId, fanGroupId: ownership.fanGroupId }
    );
  }

  getFanGroup (fanGroupId: string): Promise<FanGroup> {
    return this.apiContext.get(
      '/seaters-admin/fan-groups/:id',
      {id: fanGroupId}
    );
  }

  getFanGroupProtectionCodes (fanGroupId: string, page: PagingOptions): Promise<PagedResult<FanGroupProtectionCode>> {
    return this.apiContext.get(
      '/seaters-admin/fan-groups/:id/protection-codes',
      { id: fanGroupId },
      SeatersApiContext.buildPagingQueryParams(page)
    );
  }
  
  createFanGroupProtectionCode (fanGroupId: string, code: string, maxTimesUsed: number): Promise<FanGroupProtectionCode> {
    return this.apiContext.post(
      '/seaters-admin/fan-groups/:id/protection-codes',
      { code: code, maxTimesUsed: maxTimesUsed },
      { id: fanGroupId }
    );
  }

  deleteFanGroupProtectionCode (fanGroupId: string, code: string): Promise<any> {
    return this.apiContext.delete(
      '/seaters-admin/fan-groups/:id/protection-codes/:code',
      { id: fanGroupId, code: code }
    );
  }

  importFanGroupProtectionCodes (fanGroupId: string, fileId: string): Promise<any> {
    return this.apiContext.put(
      '/seaters-admin/fan-groups/:id/import-protection-codes/:fileId',
      null,
      { id: fanGroupId, fileId: fileId }
    );
  }

  requestOneTimeFileUpload (fileName?: string): Promise<OneTimeFile> {
    return this.apiContext.put(
      '/seaters-admin/request-one-time-upload',
      null,
      null,
      fileName ? { fileName: fileName } : null
    );
  }

  /**
   * Upload a onetime file
   * @param oneTimeFileUrl url of a OneTimeFile returned by requestOneTimeFileUpload
   * @param data for browsers: HTMLInputElement, for node: not supported
   */
  uploadOneTimeFile (oneTimeFileUrl: string, data: any): Promise<any> {
    return this.apiContext.uploadOneTimeFile(oneTimeFileUrl, data);
  }

}

/* tslint:enable:no-floating-promises */
