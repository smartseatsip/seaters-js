export interface AlgoliaConfiguration {
    appId: string;
    apiKey: string;
    indexName: string;
    attributes: Object;
}
export interface BuildInfo {
    commitId: string;
    version: string;
}
export interface Env {
    facebookAppId: string;
    googleProjectNumber: string;
    deployTarget: string;
    algoliaConfiguration: AlgoliaConfiguration;
    googleMapsApiKey: string;
    timezonedbApiKey: string;
    buildInfo: BuildInfo;
}
