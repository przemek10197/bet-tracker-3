import moment from 'moment';

export const formatDate = (date: string | Date | undefined): string => {
  return moment(date).format('YYYY.MM.DD HH:mm');
};

export const formatDoubleDigitDate = (dateInstance: number): string => {
  return `0${dateInstance}`.slice(-2);
};

export const formatToDateNotation = (
  ...dateInstance: Array<string>
): string => {
  const dateSeparator = '_';

  return dateInstance
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue + dateSeparator;
    }, '')
    .slice(0, -1);
};

export const formatDateToJson = (
  year: number,
  month: number,
  day?: number,
): string => {
  const formattedMonth = formatDoubleDigitDate(month);
  const formattedDay = day ? formatDoubleDigitDate(day) : null;

  return !formattedDay
    ? formatToDateNotation(String(year), formattedMonth)
    : formatToDateNotation(String(year), formattedMonth, formattedDay);
};
