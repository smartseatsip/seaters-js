declare module "seaters-client" {
    export class SeatersClient {
        constructor();
        greeter(name: string): string;
    }
}
declare module "index" {
    export const version: string;
    export { SeatersClient } from "seaters-client";
}
