import moment from 'moment';

import type { Bet, BetLeg } from '../models/bet.models';
import { BetResult, LegResult } from '../types/bet.types';

class BetsService {
  public betCoverage(bet: Bet): string {
    const filteredBets = bet.betLegs.filter(
      (bet) => bet.sportCategory !== 'bonus',
    );

    const winsCount = filteredBets.reduce((acc, leg) => {
      return leg.result === LegResult.WIN || leg.result === LegResult.PUSH
        ? acc + 1
        : acc;
    }, 0);

    return bet.betLegs ? `${winsCount} / ${filteredBets.length}` : '';
  }

  public betLegsSports(bet: Bet): Array<string | undefined> {
    return bet?.betLegs
      ?.filter((leg: BetLeg) => {
        return leg.result === LegResult.UNKNOWN;
      })
      .map((leg: BetLeg) => {
        return leg.sportName;
      });
  }

  public getActiveBets(bets: Array<Bet>): Array<Bet> {
    return this.sortBetsByDate(
      bets.filter((bet: Bet) => bet.result === BetResult.UNKNOWN),
    );
  }

  public sortBetsByDate(bets: Array<Bet>): Array<Bet> {
    return bets.sort((betA, betB) => {
      return (
        moment(betB.placementTime).valueOf() -
        moment(betA.placementTime).valueOf()
      );
    });
  }
}

export default new BetsService();
