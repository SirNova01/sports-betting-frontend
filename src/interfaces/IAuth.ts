export interface IUser {
    id: number;
    name: string;
    email: string;
  }
  
  export interface IAuthResponse {
    user: IUser;
    token: string;
  }
  
  // For login and signup request bodies
  export interface ILoginRequest {
    email: string;
    password: string;
  }
  
  export interface ISignupRequest {
    name: string;
    email: string;
    password: string;
  }
  