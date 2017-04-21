import { TranslationMap } from '../../seaters-api/translation-map';

const SEATERS_DEFAULT_LOCALE = 'en';

export class LocalizableText implements TranslationMap {

  [key: string]: string | any,

  constructor (translationMap: TranslationMap) {
    Object.keys(translationMap).forEach(k => this[k] = translationMap[k]);
  }

  /**
   * Translate the text in the given locale. Will fall back to 'en' when neither locale neither fallbackLocale are available
   * @param locale Locale to try to retrieve the translated text
   * @param fallbackLocale Fall back to a translation in this locale if preferred locale was not available
   */
  localize (locale: string, fallbackLocale: string): string {

    if (this.hasOwnProperty(locale)) {
      return this[locale];
    } else if (this.hasOwnProperty(fallbackLocale)) {
      return this[fallbackLocale];
    } else if (this.hasOwnProperty(SEATERS_DEFAULT_LOCALE)) {
      return this[fallbackLocale];
    } else {
      var err = 'LocalizableText - translation map is missing SEATERS_DEFAULT_LOCALE: ' + JSON.stringify(this);
      console.error(err);
      throw err;
    }
  }

}
