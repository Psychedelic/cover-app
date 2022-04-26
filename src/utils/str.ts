export const trim = (str?: string): string =>
  str ? (str.length > 10 ? `${str.slice(0, 5)}...${str.slice(str.length - 3, str.length)}` : str) : '';

export const getNameFromLabel = (str: string): string => str.replaceAll(' ', '');
