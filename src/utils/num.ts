export const isPositiveNum = (s: string): boolean => /^[1-9][0-9]*$/u.test(s);

export const isFrom1To10 = (s: string): boolean => /^(?:[0-9]{1}|10)$/u.test(s);
