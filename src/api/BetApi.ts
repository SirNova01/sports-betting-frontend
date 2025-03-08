import { IBetRequest, IPlaceBetResponse } from '../interfaces';
import axiosInstance from './axiosConfig';

export class BetsApi {
  public static async placeBet(data: IBetRequest): Promise<IPlaceBetResponse> {
    const response = await axiosInstance.post<IPlaceBetResponse>('/bets', data);
    return response.data;
  }
}
