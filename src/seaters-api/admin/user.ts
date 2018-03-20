import { BaseEntity } from './common';

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  mobilePhoneNumber: {
    localNumber: string;
    countryCallingCode: string;
  };
  facebookId: string;
  status: USER_STATUS;
  email: string;
  roles: USER_ROLE[];
  confirmedMobilePhoneNumber: boolean;
  confirmedEmail: boolean;
  language: string;
}

export type USER_STATUS = 'ACTIVE' | 'DRAFT';

export type USER_ROLE = 'FAN' | 'ADMIN' | 'TRANSLATOR' | 'FAN_GROUP_OWNER';

export interface UserSearchQuery {
  query: string;
}

export interface FanGroupOwnership {
  fanGroupId: string;
  userId: string;
}
