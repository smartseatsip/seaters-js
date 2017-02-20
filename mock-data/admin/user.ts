import { User } from '../../src/seaters-api/admin';

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
