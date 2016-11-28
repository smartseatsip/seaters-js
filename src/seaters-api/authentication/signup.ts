export interface SignupData {
  language:string,
  email:string,
  lastName:string,
  firstName:string,
  password:string
}


export interface ValidationData {
  code:string,
  email:string
}

export interface ResetEmailData {
  email:string,
  token:string
}
