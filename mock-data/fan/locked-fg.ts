import { FanGroup, Membership, FanGroupRequest } from '../../src/seaters-api/fan';
import { RequestOptions } from '../types';

var data: FanGroup = {
    "id": "locked-fg",
    "name": {
      "en": "SDK - CODEPROTECTED",
      "fr": "SDK - CODEPROTECTED",
      "es": "SDK - CODEPROTECTED",
      "nl": "SDK - CODEPROTECTED"
    },
    "translatedName": "SDK - CODEPROTECTED",
    "shortName": {
      "en": "SDK - CODEPROTECTED",
      "fr": "SDK - CODEPROTECTED",
      "es": "SDK - CODEPROTECTED",
      "nl": "SDK - CODEPROTECTED"
    },
    "translatedShortName": "SDK - CODEPROTECTED",
    "slug": "sdk-codeprotected",
    "coverImageUrl": null,
    "profileImageUrl": null,
    "backgroundImageUrl": null,
    "color1": "0645AD",
    "color2": "0645AD",
    "welcomeText": {
      "en": "sdk-codeprotected",
      "fr": "sdk-codeprotected",
      "es": "sdk-codeprotected",
      "nl": "sdk-codeprotected"
    },
    "translatedWelcomeText": "sdk-codeprotected",
    "accessMode": "CODE_PROTECTED",
    "visibility": "VISIBLE",
    "groupCategories": [
      {
        "id": "477710ea-17ff-4219-beff-378ccfd9e053",
        "name": {
          "en": "Belgium",
          "fr": "Belgium",
          "es": "Belgium",
          "nl": "Belgium"
        },
        "translatedName": "Belgium"
      }
    ],
    "statistics": {
      "numberOfMembers": 0,
      "numberOfWaitingLists": 0,
      "numberOfJoinedWaitingLists": 0,
      "numberOfSeats": 0
    },
    "protectionCodeExplanation": "ask ben",
    "membership": {
      "invitation": null,
      "request": null,
      "member": false
    },
    "fanMember": false
}

export function lockedFg(): FanGroup {
  return data;
}

export function unlockFg(options: RequestOptions) {
  var body = JSON.parse(options.body);
  var success = body.code !== 'invalid code';
  data.fanMember = success;
  data.membership.member = true;
  var request: FanGroupRequest = {
    status: success ? 'ACCEPTED' : 'REJECTED',
    rejectionReason: success ? null : 'invalid request'
  };
  data.membership.request = request;
  return request;  
}
