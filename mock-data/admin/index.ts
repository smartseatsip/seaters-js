import { Mock } from '../types';
import { user } from './user';

export const adminMocks: Mock[] = [

    {
        endpoint: 'GET /api/seaters-admin/users/user-id',
        data: {
            "status": 200,
            "statusText": "OK",
            "body": user
        }
    },
    
];