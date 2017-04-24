import { FanGroup, FanGroupRequest } from '../../src/seaters-api/fan';
import { RequestOptions } from '../types';

let data: FanGroup = {
  'id': 'locked-fg',
  'name': {
    'en': 'SDK - CODEPROTECTED',
    'nl': 'SDK - CODEPROTECTED nl'
  },
  'translatedName': 'SDK - CODEPROTECTED',
  'shortName': {
    'en': 'SDK - CODEPROTECTED',
    'nl': 'SDK - CODEPROTECTED nl'
  },
  'translatedShortName': 'SDK - CODEPROTECTED',
  'slug': 'sdk-codeprotected',
  'coverImageUrl': null,
  'profileImageUrl': null,
  'backgroundImageUrl': null,
  'color1': '0645AD',
  'color2': '0645AD',
  'welcomeText': {
    'en': 'sdk-codeprotected',
    'nl': 'sdk-codeprotected nl'
  },
  'translatedWelcomeText': 'sdk-codeprotected',
  'accessMode': 'CODE_PROTECTED',
  'visibility': 'VISIBLE',
  'groupCategories': [
    {
      'id': '477710ea-17ff-4219-beff-378ccfd9e053',
      'name': {
        'en': 'Belgium',
        'nl': 'Belgium nl'
      },
      'translatedName': 'Belgium'
    }
  ],
  'statistics': {
    'numberOfMembers': 0,
    'numberOfWaitingLists': 0,
    'numberOfJoinedWaitingLists': 0,
    'numberOfSeats': 0
  },
  'protectionCodeExplanation': 'ask ben',
  'membership': {
    'invitation': null,
    'request': null,
    'member': false
  },
  'fanMember': false
};

export function lockedFg (): FanGroup {
  return data;
}

export function unlockFg (options: RequestOptions) {
  let body = JSON.parse(options.body);
  let success = body.code !== 'invalid code';
  data.fanMember = success;
  data.membership.member = true;
  let request: FanGroupRequest = {
    status: success ? 'ACCEPTED' : 'REJECTED',
    rejectionReason: success ? null : 'invalid request'
  };
  data.membership.request = request;
  return request;
}
