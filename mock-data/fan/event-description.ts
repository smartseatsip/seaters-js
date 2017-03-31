import { EventDescription } from '../../src/seaters-api/fan';
import { mkMock, Mock } from '../types';

export const mocks: Mock[] = [
    
    mkMock('GET', '/api/fan/waiting-lists/a-wlid/event-description', {
        status: 200,
        statusText: 'OK',
        body: {
            "ru": "test event description RU",
            "en": "test event description EN",
            "fr": "test event description FR",
            "es": "test event description ES",
            "nl": "test event description NL"
        }
    })

];