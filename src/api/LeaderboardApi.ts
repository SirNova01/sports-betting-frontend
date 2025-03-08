import { ILeaderboardEntry } from '../interfaces';
import axiosInstance from './axiosConfig';


export class LeaderboardApi {
  public static async fetchLeaderboard(): Promise<ILeaderboardEntry[]> {
    const response = await axiosInstance.get<ILeaderboardEntry[]>('/leaderboard');
    return response.data;
  }
}
