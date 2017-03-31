import * as fan from '../../seaters-api/fan/fan-types';
import * as authentication from '../../seaters-api/authentication/authentication-types';

export namespace session {
    
    export interface Fan extends fan.Fan {};
    export interface PhoneNumber extends fan.PhoneNumber {};
    export interface UserData extends authentication.UserData {};
    export interface SessionToken extends authentication.SessionToken {};

}