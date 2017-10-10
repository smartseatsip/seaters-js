import { SeatersApi } from '../../seaters-api';
import { admin } from './admin-types';

export class AdminService {

  constructor (
    private api: SeatersApi
  ) {
    
  }

  getFanGroup(fanGroupId: string): Promise<admin.FanGroup> {
    return this.api.admin.getFanGroup(fanGroupId);
  }


}