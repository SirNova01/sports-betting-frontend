import axiosInstance from './axiosConfig';
import { IBet } from '../interfaces';

export class BetHistoryApi {
  public static async fetchBetHistory(): Promise<IBet[]> {
    const response = await axiosInstance.get<IBet[]>('/betshistory');
    return response.data;
  }
}
