export interface Bet {
  id?: string;
  placementTime: string;
  result?: string;
  placementProcessingFreeRate?: number;
  oddsTotal: number;
  payin: number;
  potentialWinning: number;
  placementProcessingFeeRate?: number;
  winsCount?: number;
  betLegs: Array<BetLeg>;
  singlesStatus?: number;
  dateOfUpdate?: string;
  bookmaker?: string;
}

export interface BetLeg {
  id?: string;
  startTime?: string | Date;
  sportCategory?: string;
  sportName?: string;
  sportsName?: string;
  tournamentName?: string;
  fixtureName?: string;
  marketName?: string;
  note?: string;
  selectionName?: string;
  oddsPlaced: number;
  result: string;
}

export interface BetclicBetLeg {
  combo_selection_details?: Array<BetclicBetLeg>;
  competition_label?: string;
  market_label?: string;
  match_date_utc?: string | Date;
  match_label?: string;
  odds: number;
  result: string;
  selection_label?: string;
  sport_label?: string;
}

export interface BetclicBet {
  bet_selections: Array<BetclicBetLeg>;
  id?: string;
  odds: number;
  placed_date_utc: string | Date;
  result: string;
  stake: number;
  tax_on_stake?: number;
  winnings: number;
}

export interface StsOdds {
  name: string;
  'long-name': string;
  value: string;
}

export interface StsBetLeg {
  'accepted-odds-value': string;
  date_formated: string;
  date: string;
  name: string;
  odds: StsOdds;
  action: string;
  result: string;
  sport: string;
  subname: string;
  time: string;
}

export interface StsBet {
  id?: number;
  summary: StsBetSummary;
  groups: Array<StsBetGroup>;
}

export interface StsBetGroup {
  odds: string;
  bet_type: Array<StsBetLeg>;
}

export interface StsBetSummary {
  'total-odds-value': string;
  'total-price': string;
  'total-taking': string;
  accepted: {
    date: string;
    time: string;
  };
}
