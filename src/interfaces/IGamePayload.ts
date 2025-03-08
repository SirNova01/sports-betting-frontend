export interface IOdds {
    home_win: number;
    draw: number;
    away_win: number;
}
  
export interface IGamePayload {
    game_id: string;
    home_team: string;
    away_team: string;
    score: string;
    status: string;
    minute: number;
    event: string | null;
    event_team: string | null;
    message: string;
    timestamp: string;
    odds: IOdds;
}
  