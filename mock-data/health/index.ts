import { Mock } from '../types';
import { toggleNodeDown, NODE_MOCK } from './node';

export const healthMocks: Mock[] = [
  NODE_MOCK
];

export const healthScenarios = {
  toggleNodeDown: toggleNodeDown
};
