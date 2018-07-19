import { TranslatedText } from './common';

export declare type EVENT_STATUS = 'PUBLISHED' | 'CLOSED';

export interface Event {
    name: TranslatedText;
    description: TranslatedText;
    shortName?: TranslatedText;
    status: EVENT_STATUS;
    startDate: string;
    endDate: string;
    attendeeRequiredFields: string[];
    // Unused
    ticketEvolutionId?: string;
    slug?: string;
    venueConfigId: string;
}

export interface VenueConfig {
    id: string;
    createdDate: string;
    lastModifiedDate: string;
    categories: string[];
    venueId: string;
    name: string;
}

