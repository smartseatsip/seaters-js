import { SeatersApi } from '../../seaters-api';
import { app } from './app-types';
import { HEALTH_NODE_OK } from '../../seaters-api/health/health-types';
import { Address } from '../../seaters-api/fan';

const ALL_COUNTRIES_PAGE_SIZE = 1000;
const ALL_LANGUAGES_PAGE_SIZE = 1000;
const ALL_CURRENCIES_PAGE_SIZE = 1000;
const ALL_TIME_ZONES_PAGE_SIZE = 1000;
const ALL_TRANSLATIONS_PAGE_SIZE = 20000;

export class AppService {
  private envP: Promise<app.Env>;

  constructor(private seatersApi: SeatersApi) {}

  /**
   * Fetch the application environment details
   */
  getEnv(): Promise<app.Env> {
    if (!this.envP) {
      this.envP = this.seatersApi.app.env();
    }
    return this.envP;
  }

  /**
   * Fetch a list of countries
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   */
  getCountries(): Promise<app.Country[]> {
    return this.seatersApi.app.countries({ page: 0, maxPageSize: ALL_COUNTRIES_PAGE_SIZE });
  }

  /**
   * Fetch a list of languages
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   */
  getLanguages(): Promise<app.Language[]> {
    return this.seatersApi.app.languages({ page: 0, maxPageSize: ALL_LANGUAGES_PAGE_SIZE });
  }

  /**
   * Fetch a list of currencies
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   */
  getCurrencies(): Promise<app.Currency[]> {
    return this.seatersApi.app.currencies({ page: 0, maxPageSize: ALL_CURRENCIES_PAGE_SIZE });
  }

  /**
   * Fetch a list of time zones
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   */
  getTimeZones(): Promise<app.TimeZone[]> {
    return this.seatersApi.app.timeZones({ page: 0, maxPageSize: ALL_TIME_ZONES_PAGE_SIZE });
  }

  /**
   * Fetch a list of translations
   * @param page defaults to a page with maxPageSize set to anticipated maximum value
   * @param target restrict to translations for the given target application
   * @param language restrict to translations in the given language (alpha-2 country code)
   */
  getTranslations(target?: app.TRANSLATION_TARGET, language?: string): Promise<app.Translation[]> {
    return this.seatersApi.app.translations(target, language, { page: 0, maxPageSize: ALL_TRANSLATIONS_PAGE_SIZE });
  }

  /**
   * Check if the API is in maintenance mode
   */
  isInMaintenance(): Promise<boolean> {
    return this.seatersApi.health
      .node()
      .then(msg => msg !== HEALTH_NODE_OK)
      .catch(err => {
        console.error('Seaters API under maintenance', err);
        return true;
      });
  }

  /**
   * Based on the Accept-Language header this request will obtain
   * the best suited locale seaters has available for the user.
   * This method requires the actual request library to populate the
   * Accept-Language header; by default XHR populates this for most browsers.
   * It will work even without the header, but it will always return Seater's
   * default locale in this case.
   */
  getUserDefaultLocale(): Promise<string> {
    return this.seatersApi.app.userDefaultLocale();
  }

  /**
   * Generates a seaters Address based 
   * on a given google place
   * @param place google place https://developers.google.com/maps/documentation/javascript/reference/3/
   */
  generateSeatersAddress(place): Address {
    // https://developers.google.com/places/supported_types
    const streetNumber = this.getComponentName('street_number', place);
    const routeName = this.getComponentName('route', place);
    const localityName = this.getComponentName('locality', place);
    const localityLevel1 = this.getComponentName('locality_level_1', place);
    const sublocality = this.getComponentName('sublocality', place);
    const postalTownName = this.getComponentName('postal_town', place);
    const administrativeArea2 = this.getComponentName('administrative_area_level_2', place);
    const administrativeArea1 = this.getComponentName('administrative_area_level_1', place);
    const postalCode = this.getComponentName('postal_code', place);
    const country = this.getComponentName('country', place, 'short_name');

    return {
      // addressLine1
      line1: this.generateAddressLine1(place, streetNumber, routeName),

      // zipCode
      zipCode: postalCode,
      // city
      city: this.generateCity(administrativeArea2, sublocality, localityLevel1, localityName, postalTownName),

      // state
      state: administrativeArea1,

      // countryCode
      countryCode: country
    };
  }

  private getComponentName(type, place, nameLength?) {
    nameLength = nameLength || 'long_name';
    const component = place.address_components.find(addressComponent => {
      return addressComponent.types.includes(type);
    });
    return component && component[nameLength];
  }

  private generateAddressLine1(placeObject, streetNumber, routeName) {
    let line1 = '';
    if (placeObject.formatted_address) {
      return placeObject.formatted_address.split(',')[0];
    }

    if (streetNumber) {
      line1 = streetNumber;
    }

    if (routeName && routeName) {
      line1 = streetNumber + ' ' + routeName;
    }

    if (!streetNumber && routeName) {
      line1 = routeName;
    }
    return line1;
  }

  private generateCity(administrativeArea2, sublocality, localityLevel1, localityName, postalTownName) {
    let city = '';

    if (administrativeArea2) {
      city = administrativeArea2;
    }

    if (localityLevel1) {
      city = localityLevel1;
    }

    if (sublocality) {
      city = sublocality;
    }

    if (localityName) {
      city = localityName;
    }

    if (postalTownName) {
      city = postalTownName;
    }

    return city;
  }
}
