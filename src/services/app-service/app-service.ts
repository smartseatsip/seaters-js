import { SeatersApi } from '../../seaters-api';
import { app } from './app-types';
import { HEALTH_NODE_OK } from '../../seaters-api/health/health-types';

const ALL_COUNTRIES_PAGE_SIZE = 1000;
const ALL_LANGUAGES_PAGE_SIZE = 1000;
const ALL_CURRENCIES_PAGE_SIZE = 1000;
const ALL_TIME_ZONES_PAGE_SIZE = 1000;
const ALL_TRANSLATIONS_PAGE_SIZE = 20000;

export class AppService {

  private envP: Promise<app.Env>;

  constructor (private seatersApi: SeatersApi) {
  }

  /**
   * Fetch the application environment details
   */
  getEnv (): Promise<app.Env> {
    if (!this.envP) {
      this.envP = this.seatersApi.app.env();
    }
    return this.envP;
  }

  /**
   * Fetch a list of countries
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   */
  getCountries (): Promise<Array<app.Country>> {
    return this.seatersApi.app.countries({ page: 0, maxPageSize: ALL_COUNTRIES_PAGE_SIZE });
  }

  /**
   * Fetch a list of languages
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   */
  getLanguages (): Promise<Array<app.Language>> {
    return this.seatersApi.app.languages({ page: 0, maxPageSize: ALL_LANGUAGES_PAGE_SIZE });
  }

  /**
   * Fetch a list of currencies
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   */
  getCurrencies (): Promise<Array<app.Currency>> {
    return this.seatersApi.app.currencies({ page: 0, maxPageSize: ALL_CURRENCIES_PAGE_SIZE });
  }

  /**
   * Fetch a list of time zones
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   */
  getTimeZones (): Promise<Array<app.TimeZone>> {
    return this.seatersApi.app.timeZones({ page: 0, maxPageSize: ALL_TIME_ZONES_PAGE_SIZE });
  }

  /**
   * Fetch a list of translations
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   * @param target restrict to translations for the given target application
   * @param language restrict to translations in the given language (alpha-2 country code)
   */
  getTranslations (target?: app.TRANSLATION_TARGET, language?: string): Promise<Array<app.Translation>> {
    return this.seatersApi.app.translations(target, language, { page: 0, maxPageSize: ALL_TRANSLATIONS_PAGE_SIZE });
  }

  /**
   * Check if the API is in maintenance mode
   */
  isInMaintenance (): Promise<boolean> {
    return this.seatersApi.health.node()
      .then(msg => msg !== HEALTH_NODE_OK)
      .catch(err => {
        console.error('Seaters API under maintenance', err);
        return true;
      });
  }

}
