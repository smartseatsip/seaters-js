import { ServerResponse, RequestOptions } from './request-driver';

function getPathFromUrl (url) {
  return /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/.exec(url)[3];
}

export function buildMockRequestDriver (mockData: any) {

  if (!mockData) {
    throw new Error('[MockRequestDriver] mockData not supplied');
  }

  return function (options: RequestOptions): Promise<ServerResponse> {
    let key = options.method + ' ' + options.url;
    if (!mockData.hasOwnProperty(key)) {
      key = options.method + ' /' + getPathFromUrl(options.url);
    }

    let mock;
    if (mockData.hasOwnProperty(key)) {
      mock = mockData[key];
    } else {
      return Promise.reject('[MockRequestDriver] Not Implemented: ' + key);
    }

    let response: ServerResponse;
    if (typeof(mock) === 'function') {
      console.log('[MockRequestDriver] (fn) %s', key);
      response = mock(options);
    } else if (typeof(mock) === 'object') {
      console.log('[MockRequestDriver] %s', key);
      response = mock;
    } else {
      return Promise.reject('[MockRequestDriver] Invalid Mock: ' + key);
    }
    // serialize body if needed
    if (typeof(response.body as any) === 'object') {
      response.body = JSON.stringify(response.body);
    }
    response.driver = 'MOCK';
    return Promise.resolve(response);
  };

}
