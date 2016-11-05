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