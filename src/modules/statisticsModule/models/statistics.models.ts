export interface AccountTracking {
  [key: string]: AccountDateTracking;
}

export interface AccountDateTracking {
  [key: string]: number;
}
