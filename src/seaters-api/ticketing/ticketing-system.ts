export interface DigitickConfiguration {
  endpointURL: string;
  login: string;
  usingMock: boolean;
  password: string;
}

export interface VeritixConfiguration {
  endpointURL: string;
  login: string;
  usingMock: boolean;
  directSettlementPaymentTypeId: number;
  password: string;
}

export interface TicketingSystem {
  cancelable: boolean;
  digitickConfiguration: DigitickConfiguration;
  veritixConfiguration: VeritixConfiguration;
  name: string;
  id: string;
  type: string;
}
