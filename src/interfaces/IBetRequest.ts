export interface IBetRequest {
    bet: {
      game_id: string;
      amount: number;
      odds: number;
      bet_type: string;
    };
}