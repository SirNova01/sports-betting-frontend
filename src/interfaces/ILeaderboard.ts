export interface ILeaderboardEntry {
    user_id: number;
    name: string;
    total_payout: number;
}
  
export interface ILeaderboardPayload {
    entries: ILeaderboardEntry[];
    updated_at: string;
}
  