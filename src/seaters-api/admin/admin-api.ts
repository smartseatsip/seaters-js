import { ApiContext } from '../../api';
import { PagedResult } from '../paged-result';
import { PagingOptions } from '../paging-options';
import { SeatersApiController } from '../seaters-api-controller';
import { User, UserSearchQuery, FanGroupOwnership } from './admin-types';

export class AdminApi extends SeatersApiController {

    constructor (private apiContext: ApiContext) {
        super();
    }

    getUsers (page: PagingOptions): Promise<PagedResult<User>> {
      return this.apiContext.get(
          '/seaters-admin/users',
          null,
          this.buildPagingQueryParams(page)
      );
    }

    searchUsers (query: UserSearchQuery, page: PagingOptions): Promise<PagedResult<User>> {
        return this.apiContext.put(
            '/seaters-admin/users',
            query,
            null,
            this.buildPagingQueryParams(page)
        );
    }

    getUser (id: string): Promise<User> {
        return this.apiContext.get(
            '/seaters-admin/users/:id',
            this.buildParams({id: id})
        );
    }

    updateUser (user: User): Promise<User> {
        return this.apiContext.put(
            '/seaters-admin/users/:id',
            user,
            this.buildParams({id: user.id})
        );
    }

    deleteUser (id: string): Promise<User> {
        return this.apiContext.delete(
            '/seaters-admin/users/:id',
            this.buildParams({id: id})
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
            this.buildPagingQueryParams(page)
        );
    }

    createUserOwnership (ownership: FanGroupOwnership): Promise<FanGroupOwnership> {
        return this.apiContext.post(
            '/seaters-admin/users/:id/ownerships',
            ownership,
            this.buildParams({id: ownership.userId})
        );
    }

    deleteUserOwnership (ownership: FanGroupOwnership): Promise<FanGroupOwnership> {
        return this.apiContext.delete(
            '/seaters-admin/users/:userId/ownerships/:fanGroupId',
            this.buildParams({userId: ownership.userId, fanGroupId: ownership.fanGroupId})
        );
    }

}
