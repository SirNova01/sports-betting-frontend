import axios, { AxiosResponse } from 'axios';
import { IAuthResponse, ILoginRequest, ISignupRequest } from '../interfaces';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export class AuthApi {
  public static async login(data: ILoginRequest): Promise<IAuthResponse> {
    // POST /auth/login
    const resp: AxiosResponse<IAuthResponse> = await axios.post(
      `${BASE_URL}/auth/login`,
      data
    );
    return resp.data;
  }

  public static async signup(data: ISignupRequest): Promise<IAuthResponse> {
    // POST /users
    const resp: AxiosResponse<IAuthResponse> = await axios.post(
      `${BASE_URL}/users`,
      data
    );
    return resp.data;
  }

  public static async logout(token: string): Promise<void> {
    await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
