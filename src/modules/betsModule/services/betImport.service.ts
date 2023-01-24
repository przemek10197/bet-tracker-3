import type {
  Bet,
  BetLeg,
  StsBet,
  StsBetLeg,
  BetclicBetLeg,
} from '../models/bet.models';
import { BetResult } from '../types/bet.types';
import { Bookmaker } from '../models/enums';
import { useStoreBets } from '../store/storeBets';

const storeBets = useStoreBets();

class BetImportService {
  public formattedBet(
    odds: number,
    placementTime: string,
    result: string | BetResult,
    payin: number,
    potentialWinning: number,
    bookmaker: Bookmaker,
    betLegs: Array<BetLeg>,
  ): Bet {
    return {
      oddsTotal: odds,
      placementTime: placementTime,
      result: result,
      payin: payin,
      winsCount: 0,
      potentialWinning: potentialWinning,
      bookmaker: bookmaker,
      betLegs: betLegs,
    };
  }

  public sortBetsByDate(betLegs: Array<BetLeg>): Array<BetLeg> {
    return betLegs.sort((legA: BetLeg, legB: BetLeg) => {
      if (!(legA.startTime && legB.startTime)) {
        return 0;
      }

      return (
        new Date(legA.startTime).getTime() - new Date(legB.startTime).getTime()
      );
    });
  }

  public async importFromBetclic(importedBet: string): Promise<void> {
    const newBet = JSON.parse(importedBet);

    let betmakerBets: Array<BetLeg> = [];

    let betLegs = newBet.bet_selections.map((leg: BetclicBetLeg) => {
      if (leg.selection_label === 'BetMaker' && leg.combo_selection_details) {
        betmakerBets = leg.combo_selection_details.map((comboLeg) => {
          return {
            startTime: leg.match_date_utc,
            sportName: leg.sport_label,
            sportCategory: leg.sport_label,
            tournamentName: leg.competition_label,
            marketName: comboLeg.market_label,
            fixtureName: leg.match_label,
            selectionName: comboLeg.selection_label,
            oddsPlaced: 1.5,
            result: leg.result === 'Win' ? 'WINNING' : 'UNKNOWN',
          };
        });
      }
      return {
        startTime: leg.match_date_utc,
        sportName: leg.sport_label,
        sportCategory: leg.sport_label,
        tournamentName: leg.competition_label,
        marketName: leg.market_label,
        fixtureName: leg.match_label,
        selectionName: leg.selection_label,
        oddsPlaced: leg.odds,
        result: leg.result === 'Win' ? 'WINNING' : 'UNKNOWN',
      };
    });

    if (betmakerBets.length > 0) {
      betLegs.push(...betmakerBets);
    }
    betLegs = this.sortBetsByDate(betLegs);

    const betToReturn = this.formattedBet(
      newBet.odds,
      newBet.placed_date_utc,
      BetResult.UNKNOWN,
      newBet.stake + newBet.tax_on_stake,
      newBet.winnings,
      Bookmaker.BETCLIC,
      betLegs,
    );

    storeBets.addBet(betToReturn);
  }

  public async importFromFortuna(importedBet: string): Promise<void> {
    const { placementTime, result, oddsTotal, payin, potentialWinning } =
      JSON.parse(importedBet);

    let betLegs = JSON.parse(importedBet).legs.map((leg: BetLeg) => {
      return {
        startTime: leg.startTime,
        sportCategory: leg.sportCategory,
        sportName: leg.sportName,
        tournamentName: leg.tournamentName,
        fixtureName: leg.fixtureName,
        marketName: leg.marketName,
        note: leg.note,
        selectionName: leg.selectionName,
        oddsPlaced: leg.oddsPlaced,
        result: leg.result,
      };
    });
    betLegs = this.sortBetsByDate(betLegs);

    const betToImport = this.formattedBet(
      oddsTotal,
      placementTime,
      result,
      payin,
      potentialWinning,
      Bookmaker.FORTUNA,
      betLegs,
    );

    storeBets.addBet(betToImport);
  }

  public async importFromSts(importedBet: string): Promise<void> {
    const newBet: StsBet = JSON.parse(importedBet);

    const payin = Number(newBet.summary['total-price']);
    const oddsTotal = Number(newBet.summary['total-odds-value']);
    const potentialWinning = Number(newBet.summary['total-taking']);
    const placementTime = `${newBet.summary.accepted.date}T${newBet.summary.accepted.time}Z`;
    let betLegs: Array<BetLeg> = newBet.groups[0]['bet_type'].map(
      (leg: StsBetLeg) => {
        return {
          startTime: `${leg.date}T${leg.time}Z`,
          sportName: leg.sport,
          sportCategory: leg.sport,
          tournamentName: leg.action,
          marketName: leg.subname,
          fixtureName: leg.name,
          selectionName: leg.odds['long-name'],
          oddsPlaced: Number(leg.odds.value),
          result:
            leg.result === 'UNRESOLVED' ? BetResult.UNKNOWN : BetResult.WIN,
        };
      },
    );
    betLegs = this.sortBetsByDate(betLegs);

    const betToImport = this.formattedBet(
      oddsTotal,
      placementTime,
      BetResult.UNKNOWN,
      payin,
      potentialWinning,
      Bookmaker.STS,
      betLegs,
    );

    storeBets.addBet(betToImport);
  }
}

export default new BetImportService();
