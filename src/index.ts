//noinspection TsLint
// tslint:disable-next-line
export const version: string = '${package.version}';

export * from './seaters-client';
export * from './shared-types';

export { admin } from './services/admin-service';
export { app } from './services/app-service';
export { fan } from './services/fan-service/fan-types';
export { payment } from './services/payment-service';
export { pub } from './services/public-service/public-types';
export { profiling } from './services/fan-service/profiling-types';
export { session } from './services/session-service/session-types';
export { survey } from './services/fan-service/survey-types';
export { ticketing } from './services/ticketing-service';
