export interface SingleBetModel {
  fixtureName: string;
  id?: string;
  dateOfUpdate?: string;
  marketName: string;
  oddsTotal: number;
  payin: number;
  placementProcessingFeeRate?: number;
  placementTime: string;
  potentialWinning: number;
  result?: string;
  selectionName: string;
  singlesStatus?: number;
  sportsCategory?: string;
  sportsName?: string;
  startTime: string;
  tournamentName?: string;
  winsCount?: number;
}

export interface SinglesStatus {
  id?: string;
  status?: number;
  wins?: number;
  losses?: number;
}
