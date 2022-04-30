export const trim = (str?: string): string =>
  str ? (str.length > 10 ? `${str.slice(0, 5)}...${str.slice(str.length - 3, str.length)}` : str) : '';

export const getNameFromLabel = (str: string): string => str.replaceAll(' ', '');

export const toGithubUrl = (url?: string): string => (url ? `https://github.com/${url}` : '');

export const lastUrlSegment = (url?: string): string => (url ? `/${url.split('/').pop() || ''}` : '');

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
