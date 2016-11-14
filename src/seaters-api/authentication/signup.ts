export interface SignupData {
  language:string,
  email:string,
  lastName:string,
  firstName:string,
  password:string,
  username:string
}


export interface ValidationData {
  code:string,
  email:string,
  mobile:
    {
      countryCallingCode:string,
      localNumber:string
    }
}
