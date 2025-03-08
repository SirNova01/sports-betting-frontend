export interface IBet {
    id: number;
    user_id: number;
    game_id: number;
    amount: string;            
    odds: number;
    potential_payout: string;  
    status: string;      
    created_at: string;
    updated_at: string;
    bet_type: string;  
  }
  