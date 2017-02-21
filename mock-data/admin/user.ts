import { User } from '../../src/seaters-api/admin';
import { PagedResult, PagingOptions } from '../../src/seaters-api';

export const user: User = {
    id: 'user-id',
    createdDate: '2012-01-01T00:00:00.000+0000',
    lastModifiedDate: '2012-02-02T00:00:00.000+0000',
    firstName: "Ben",
    lastName: "Corne",
    email: "fake-email@seaters.com",
    facebookId: null,
    mobilePhoneNumber: {
        countryCallingCode: '+32',
        localNumber: '470000000'
    },
    roles: ['FAN'],
    status: 'ACTIVE',
    language: 'en',
    confirmedEmail: false,
    confirmedMobilePhoneNumber: false
};

var _user2: User = Object.assign({}, user);
_user2.firstName = 'Sven';
_user2.lastName = 'Schippers';
_user2.email = 'fake-email2@seaters.com';
export const user2 = _user2;

export function pagedUsers (page: PagingOptions): PagedResult<User> {
    return {
        itemOffset: page.itemOffset,
        maxPageSize: page.maxPageSize,
        totalSize: 2,
        items: [
            user,
            user2
        ]
    };
}
