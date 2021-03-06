export interface FanGroup {
  /**
   * FanGroup's slug
   */
  slug: string;

  /**
   * FanGroup's welcome text: {string=>string}
   * @deprecated use translatedWelcomeText
   */
  welcomeText: any;

  /**
   * How to get the protection code, translated in user locale
   */
  protectionCodeExplanation: string;

  /**
   * FanGroup's access mode
   */
  accessMode: ACCESS_MODE;

  /**
   * FanGroup's visibility
   */
  visibility: VISIBILITY;

  /**
   * True if authenticated fan is member of the FanGroup
   */
  fanMember: boolean;

  /**
   * FanGroup statistics
   */
  statistics: Statistics;

  /**
   * FanGroup's short name: {string=>string}
   * @deprecated use translatedShortName
   */
  shortName: any;

  /**
   * FanGroup's color 1
   */
  color1: string;

  /**
   * FanGroup's cover image
   */
  coverImageUrl: string;

  /**
   * FanGroup's profile image
   */
  backgroundImageUrl: string;

  /**
   * FanGroup's color 2
   */
  color2: string;

  /**
   * A description of the membership of the Fan to the Fan Group
   */
  membership: Membership;

  /**
   * Fan Group's short name, translated in fan locale
   */
  translatedShortName: string;

  /**
   * Fan Group's welcome text, translated in fan locale
   */
  translatedWelcomeText: string;

  /**
   * Fan Group categories
   */
  groupCategories: FanGroupCategory[];

  /**
   * Fan Group's name, translated in fan locale
   */
  translatedName: string;

  /**
   * FanGroup's profile image
   */
  profileImageUrl: string;

  /**
   * FanGroup's name: {string=>string}
   * @deprecated use translatedName
   */
  name: any;

  /**
   * FanGroup's ID
   * @format UUID
   */
  id: string;

  /**
   * Visibility of rank & likelihood indicator
   */
  rankAndLikelihoodHidden: boolean;

  /**
   * Visibility of logo indicator
   */
  showLogo: boolean;

  /**
   * To use as title when notification about geo location is needed
   */
  geoFilteringNotificationTitle: any;

  /**
   * To use as description when notification about geo location is needed
   */
  geoFilteringNotificationDescription: any;

  /** Terms and condition links {string=>string} - 1 per supported locale */
  termsAndConditions: any;

  /** Privacy Policy links {string=>string} - 1 per supported locale */
  privacyPolicy: any;
}

export type ACCESS_MODE = 'PUBLIC' | 'PRIVATE' | 'CODE_PROTECTED';

export type VISIBILITY = 'VISIBLE' | 'INVISIBLE';

export interface Statistics {
  /**
   * The number of Seats of Fan in FanGroup
   */
  numberOfSeats: number;

  /**
   * The number of FanGroup's members
   */
  numberOfMembers: number;

  /**
   * The number of Waiting Lists in FanGroup
   */
  numberOfWaitingLists: number;

  /**
   * The number of Waiting Lists joined by Fan in FanGroup
   */
  numberOfJoinedWaitingLists: number;
}

export interface Membership {
  /**
   * An invitation if available, null otherwise
   */
  invitation: Invitation;

  /**
   * The request to join if available, null otherwise
   */
  request: FanGroupRequest;

  /**
   * True if Fan is member of the Fan Group
   */
  member: boolean;
}

export interface Invitation {
  /**
   * Invitation's status
   */
  status: INVITATION_STATUS;
}

export type INVITATION_STATUS = 'PENDING' | 'IGNORED' | 'ACCEPTED';

export interface FanGroupCategory {
  /**
   * Category name, translated in the fan's locale
   */
  translatedName: string;

  /**
   * Category's name: {string=>string}
   * @deprecated use translatedName
   */
  name: any;

  /**
   * Category's ID
   * @format UUID
   */
  id: string;
}

export interface FanGroupRequest {
  /**
   * The reason of rejection
   */
  rejectionReason: string;

  /**
   * Request's status
   */
  status: FG_REQUEST_STATUS;
}

export type FG_REQUEST_STATUS = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface FanGroupFilterInfo {
  hasGeoFilteredWaitingLists: boolean;
}
