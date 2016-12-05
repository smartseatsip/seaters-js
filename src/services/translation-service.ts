import { Map } from 'core-js/library';

export type Locale = 'en' | 'es' | 'nl' | 'fr' | 'pt' | string;

export class TranslationStore extends Map<string, Object> {

    constructor (translationGroups: TranslationGroup[]) {
        super();
        translationGroups.forEach(tg => {
            var obj = {};
            tg.translations.forEach(trl => obj[trl.locale] = trl.translation);
            this.set(tg.key, obj);
        });
    }

}

export interface TranslationGroup {
    key: string,
    translations: TranslationObject[]
}

export interface TranslationObject {
    locale: Locale,
    translation: string
}

export class TranslationService {

    static DEFAULT_LOCALE = 'en';

    constructor () {

    }

    translateFromObject (obj: Object, locale: Locale) {
        var translation: string = undefined;

        if (obj.hasOwnProperty(locale)) {
            translation = obj[locale];
        } else {
            translation = obj[TranslationService.DEFAULT_LOCALE];
            console.warn('[TranslationService] Missing %s translation for %s', locale, translation);
        }

        if (!translation) {
            console.error('[TranslationService] Missing default translation for %s', JSON.stringify(obj));
            translation = '[@missing_translation@]';
        }

        return translation;
    }

    translateFromStore (store: TranslationStore, key: string, locale: Locale) {
        //Ignore empty keys
        if (key==="")
          return "";

        if (store.has(key)) {
            var obj = store.get(key);
        } else {
            console.error('[TranslationService] Missing local translation for key %s', key);
            obj = {};
            obj[TranslationService.DEFAULT_LOCALE] = '[@missing_translation@:'+key+']';
        }
        return this.translateFromObject(obj, locale);
    }

}
