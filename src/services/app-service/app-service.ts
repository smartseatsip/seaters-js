import { SeatersApi } from '../../seaters-api';
import { app } from './app-types';
import { PagedResult, PagingOptions } from '../../shared-types';
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
  getCountries (page?: PagingOptions): Promise<PagedResult<app.Country>> {
    return this.seatersApi.app.countries(this.defaultPage(page, ALL_COUNTRIES_PAGE_SIZE));
  }

  /**
   * Fetch a list of languages
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   */
  getLanguages (page?: PagingOptions): Promise<PagedResult<app.Language>> {
    return this.seatersApi.app.languages(this.defaultPage(page, ALL_LANGUAGES_PAGE_SIZE));
  }

  /**
   * Fetch a list of currencies
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   */
  getCurrencies (page?: PagingOptions): Promise<PagedResult<app.Currency>> {
    return this.seatersApi.app.currencies(this.defaultPage(page, ALL_CURRENCIES_PAGE_SIZE));
  }

  /**
   * Fetch a list of time zones
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   */
  getTimeZones (page?: PagingOptions): Promise<PagedResult<app.TimeZone>> {
    return this.seatersApi.app.timeZones(this.defaultPage(page, ALL_TIME_ZONES_PAGE_SIZE));
  }

  /**
   * Fetch a list of translations
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   * @param target restrict to translations for the given target application
   * @param language restrict to translations in the given language (alpha-2 country code)
   */
  getTranslations (target?: app.TRANSLATION_TARGET, language?: string, page?: PagingOptions): Promise<PagedResult<app.Translation>> {
    return this.seatersApi.app.translations(target, language, this.defaultPage(page, ALL_TRANSLATIONS_PAGE_SIZE));
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

  private defaultPage (page: PagingOptions, defaultPageSize: number): PagingOptions {
    if (page) {
      return page;
    } else {
      return {
        maxPageSize: defaultPageSize,
        page: 0
      };
    }
  }

}
