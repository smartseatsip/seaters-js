export interface Fan {
  /**
   * Fan's notification preferences
   */
  notificationChannels: NotificationChannels;

  /**
   * Fan's marketing preferences
   */
  directMarketingSettings: DirectMarketingSettings;

  /**
   * Fan's first name
   */
  firstName: string;

  /**
   * Fan's last name.
   */
  lastName: string;

  /**
   * Fan's mobile phone number
   */
  mobilePhoneNumber: PhoneNumber;

  /**
   * Fan's username
   */
  username: string;

  /**
   * Fan's email
   */
  email: string;

  /**
   * Fan's roles
   */
  roles: ROLE[];

  /**
   * Fan's invoice data
   */
  invoiceInfo: InvoiceInfo;

  validatedEmail: boolean;

  validatedMobilePhone: boolean;

  personalInfo: PersonalInfo;

  /**
   * Fan's full name
   */
  name: string;

  /**
   * Fan's language
   */
  language: string;
}

export interface NotificationChannels {
  byMail: boolean;
  bySms: boolean;
}

export interface DirectMarketingSettings {
  allowDirectMarketingFromSeaters: boolean;
  allowDirectMarketingFromPartners: boolean;
}

export interface PhoneNumber {
  countryCallingCode: string;
  localNumber: string;
}

export type ROLE = 'FAN' | 'ADMIN' | 'TRANSLATOR' | 'FAN_GROUP_OWNER';

export interface InvoiceInfo {
  /**
   * VAT number
   */
  vatNumber: string;

  /**
   * Invoice address
   */
  address: Address;

  /**
   * Name on the invoice
   */
  name: string;
}

export interface Address {
  /**
   * @format alpha-2 country code
   */
  countryCode: string;
  zipCode: string;
  city: string;
  line1: string;
  line2: string;
  line3: string;
  state: string;

  /**
   * @deprecated
   */
  street: string;
  /**
   * @deprecated
   */
  number: string;
  /**
   * @deprecated
   */
  country: string;
}

export interface PersonalInfo {
  birthDate: string;
  idNumber: string;
  title: TITLE;
  citizenshipCountryCode: string;
  address: Address;
}

export type TITLE = 'MR' | 'MS';

export interface ISendUpdateEmailDTO {
  email: string;
  confirmationReturnURLPath: string;
}
