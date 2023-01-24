import { formatDateToJson } from '@/utils';

import { useStoreStatistics } from '../store/storeStatistics';

const storeStatistics = useStoreStatistics();

class StatisticsService {
  updateYearStatistics(newValue: number, placementTime: number) {
    const yearStats = storeStatistics.accountYearTracking;

    if (!yearStats) {
      return;
    }

    const accountYear = Object.keys(yearStats).find(
      (year) => year === String(placementTime),
    );
    if (accountYear) {
      yearStats[accountYear] = Number(yearStats[accountYear]) + newValue;
      yearStats[accountYear] = Number(yearStats[accountYear].toFixed(2));
    } else {
      yearStats[placementTime] = newValue;
      yearStats[placementTime] = Number(yearStats[placementTime].toFixed(2));
    }

    return yearStats;
  }

  updateMonthStatistics(newValue: number, placementTime: string) {
    const monthStats = storeStatistics.accountMonthTracking;

    if (!monthStats) {
      return;
    }

    const accountMonthYear = Object.keys(monthStats).find(
      (monthYear) => monthYear === String(placementTime),
    );
    if (accountMonthYear) {
      monthStats[accountMonthYear] =
        Number(monthStats[accountMonthYear]) + newValue;
      monthStats[accountMonthYear] = Number(
        monthStats[accountMonthYear].toFixed(2),
      );
    } else {
      monthStats[placementTime] = newValue;
      monthStats[placementTime] = Number(monthStats[placementTime].toFixed(2));
    }

    return monthStats;
  }

  updateDayStatistics(newValue: number, placementTime: string) {
    const dayStats = storeStatistics.accountDayTracking;

    if (!dayStats) {
      return;
    }

    const accountDayMonthYear = Object.keys(dayStats).find(
      (monthYear) => monthYear === String(placementTime),
    );
    if (accountDayMonthYear) {
      dayStats[accountDayMonthYear] =
        Number(dayStats[accountDayMonthYear]) + newValue;
      dayStats[accountDayMonthYear] = Number(
        dayStats[accountDayMonthYear].toFixed(2),
      );
    } else {
      dayStats[placementTime] = newValue;
      dayStats[placementTime] = Number(dayStats[placementTime].toFixed(2));
    }

    return dayStats;
  }

  statisticsAdd(value: number, placementTime: string) {
    const betPlacementYear = new Date(placementTime).getFullYear();
    const betPlacementMonth = new Date(placementTime).getUTCMonth() + 1;
    const betPlacementDay = new Date(placementTime).getUTCDate();

    const monthYearDate = formatDateToJson(betPlacementYear, betPlacementMonth);
    const fullDate = formatDateToJson(
      betPlacementYear,
      betPlacementMonth,
      betPlacementDay,
    );

    const updatedYearStatistics = this.updateYearStatistics(
      value,
      betPlacementYear,
    );
    const updatedMonthStatistics = this.updateMonthStatistics(
      value,
      monthYearDate,
    );
    const updatedDayStatistics = this.updateDayStatistics(value, fullDate);

    storeStatistics.updateStatisticsYear(updatedYearStatistics!);
    storeStatistics.updateStatisticsMonth(updatedMonthStatistics!);
    storeStatistics.updateStatisticsDay(updatedDayStatistics!);
  }
}

export default new StatisticsService();
