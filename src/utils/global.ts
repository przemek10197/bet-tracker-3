export const convertNumberToNegative = (num: number): number =>
  Math.abs(num) * -1;

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isValuePositive = (value: number): boolean => {
  return value >= 0;
};

export const assignObjectArrayValue = <T>(
  obj: Record<string, T[]>,
  objValue: string,
  pushValue: T,
): Record<string, T[]> => {
  if (Object.prototype.hasOwnProperty.call(obj, objValue)) {
    obj[objValue].push(pushValue);
  } else {
    obj[objValue] = [pushValue];
  }

  return obj;
};
