import { Mock } from '../types';
import { user, pagedUsers } from './user';

export const adminMocks: Mock[] = [

    {
        endpoint: 'GET /api/seaters-admin/users/user-id',
        data: {
            status: 200,
            statusText: "OK",
            body: user
        }
    },

    {
        endpoint: 'PUT /api/seaters-admin/users?maxPageSize=10&itemOffset=0',
        data: {
            status: 200,
            statusText: 'OK',
            body: pagedUsers({itemOffset: 0, maxPageSize: 0})
        }
    },

    {
        endpoint: 'GET /api/seaters-admin/users?maxPageSize=10&itemOffset=0',
        data: {
            status: 200,
            statusText: 'OK',
            body: pagedUsers({itemOffset: 0, maxPageSize: 0})
        }
    },
    
];