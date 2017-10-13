/* tslint:disable:no-floating-promises */
import { SeatersApiContext } from '../../seaters-api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { SeatersApiController } from '../seaters-api-controller';
import { User, UserSearchQuery, FanGroupOwnership } from './admin-types';

export class AdminApi extends SeatersApiController {
  constructor(private apiContext: SeatersApiContext) {
    super();
  }

  getUsers(page: PagingOptions): Promise<PagedResult<User>> {
    return this.apiContext.get('/seaters-admin/users', null, SeatersApiContext.buildPagingQueryParams(page));
  }

  searchUsers(query: UserSearchQuery, page: PagingOptions): Promise<PagedResult<User>> {
    return this.apiContext.put('/seaters-admin/users', query, null, SeatersApiContext.buildPagingQueryParams(page));
  }

  getUser(id: string): Promise<User> {
    return this.apiContext.get('/seaters-admin/users/:id', { id });
  }

  updateUser(user: User): Promise<User> {
    return this.apiContext.put('/seaters-admin/users/:id', user, { id: user.id });
  }

  deleteUser(id: string): Promise<User> {
    return this.apiContext.delete('/seaters-admin/users/:id', { id });
  }

  createUser(user: User): Promise<User> {
    return this.apiContext.post('/seaters-admin/users', user);
  }

  getUserOwnerships(userId: string, page: PagingOptions): Promise<PagedResult<FanGroupOwnership>> {
    return this.apiContext.get(
      '/seaters-admin/users/:id/ownerships',
      null,
      SeatersApiContext.buildPagingQueryParams(page)
    );
  }

  createUserOwnership(ownership: FanGroupOwnership): Promise<FanGroupOwnership> {
    return this.apiContext.post('/seaters-admin/users/:id/ownerships', ownership, { id: ownership.userId });
  }

  deleteUserOwnership(ownership: FanGroupOwnership): Promise<FanGroupOwnership> {
    return this.apiContext.delete('/seaters-admin/users/:userId/ownerships/:fanGroupId', {
      userId: ownership.userId,
      fanGroupId: ownership.fanGroupId
    });
  }
}

/* tslint:enable:no-floating-promises */
