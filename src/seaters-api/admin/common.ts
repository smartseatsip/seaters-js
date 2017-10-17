export interface TranslatedTextPart {
  text: string;
  lang: string;
}
export type TranslatedText = TranslatedTextPart[];

export interface BaseEntity {
  /**
   * Entity identity
   */
  id: string;

  /**
   * Datestring
   */
  createdDate: string;

  /**
   * Datestring
   */
  lastModifiedDate: string;
}
