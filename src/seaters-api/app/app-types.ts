export module app {

    export interface Country {        
        /**
         * Country's ISO 3166 alpha2-code.
         */
        alpha2Code:string,
        
        /**
         * Country's calling codes. 1 to 3 digit codes without plus sign
         */
        callingCodes: string[],
        
        /**
         * Country's name
         */
        name: string
    }

    export interface AlgoliaConfiguration {
        appId: string,
        apiKey: string,
        indexName: string
        attributes: Object
    }

    export interface BuildInfo {
        commitId: string,
        version: string
    }

    export interface Env {
        facebookAppId: string,
        googleProjectNumber: string,
        deployTarget: string,
        algoliaConfiguration: AlgoliaConfiguration,
        googleMapsApiKey: string,
        timezonedbApiKey: string,
        buildInfo: BuildInfo
    }

}
