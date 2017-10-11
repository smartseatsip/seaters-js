export interface AlgoliaConfiguration {
  appId: string;
  apiKey: string;
  indexName: string;
  attributes: object;
}

export interface BuildInfo {
  commitId: string;
  version: string;
}

export interface Env {
  /**
   * public facebook app id, required by facebook SDK
   */
  facebookAppId: string;

  /**
   * public google project number, required by google SDK
   */
  googleProjectNumber: string;

  /**
   * Which environment is this api serving
   */
  deployTarget: string;

  /**
   * Algolia configuration containing public api key, index names and indexed attributes
   */
  algoliaConfiguration: AlgoliaConfiguration;

  /**
   * Public key to access google maps's API
   */
  googleMapsApiKey: string;

  /**
   * Public key to access timezonedb's API
   */
  timezonedbApiKey: string;

  /**
   * API Build Info
   */
  buildInfo: BuildInfo;
}

export interface Country {
  /**
   * Country's ISO 3166 alpha2-code.
   */
  alpha2Code: string;

  /**
   * Country's calling codes. 1 to 3 digit codes without plus sign
   */
  callingCodes: string[];

  /**
   * Country's name
   */
  name: string;
}

export interface TimeZone {
  /**
   * Time zone id (names found on https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
   */
  id: string;
}

export interface Language {
  /**
   * Country of the Language (not a proper locale)
   * Format: alpha-2 country code
   */
  locale: string;

  /**
   * Translation mapping of country of locale to the name of the language in that locale
   */
  name: { [key: string]: string };
}

export interface Currency {
  /**
   * Currency code (example USD, EUR)
   */
  code: string;

  /**
   * Currency symbol (example $, €)
   */
  symbol: string;
}

export type TRANSLATION_TARGET = 'WEB' | 'IOS' | 'ANDROID' | 'ALL' | 'COCKPIT' | 'DASHBOARD';

export interface Translation {
  /**
   * Translated text
   */
  text: string;

  /**
   * Translation key - unique for the given target
   */
  key: string;

  /**
   * Systemwide unique translation identifier
   */
  id: string;

  /**
   * Context in which the translation is used
   */
  target: TRANSLATION_TARGET;

  /**
   * Language of the translation
   * Format: alpha-2 country code
   */
  lang: string;
}
