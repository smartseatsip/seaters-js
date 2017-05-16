import { WaitingListRequest } from '../../src/seaters-api/fan/waiting-list';
import { RequestOptions } from '../types';

export function unlockWl (data, options: RequestOptions) {
  let body = JSON.parse(options.body);
  let success = body.code !== 'invalid code';
  let request: WaitingListRequest = {
    status: success ? 'ACCEPTED' : 'REJECTED',
    rejectionReason: success ? null : 'invalid request'
  };
  data.request = request;
  return request;
}
