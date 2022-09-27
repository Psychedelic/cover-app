export const trim = (str?: string): string =>
  str ? (str.length > 10 ? `${str.slice(0, 5)}...${str.slice(str.length - 3, str.length)}` : str) : '';

export const getNameFromLabel = (str?: string): string | undefined => str && str.replaceAll(' ', '');

export const toGithubUrl = (url?: string, commitHash?: string): string =>
  url && commitHash ? `https://github.com/${url}/tree/${commitHash}` : '';

export const lastUrlSegment = (url?: string): string => (url ? `/${url.split('/').pop() || ''}` : '');

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const isNotEmpty = (str: string) => str !== '';

export const isValidRepoFormat = (str: string) => /^[^ /]+\/[^ /]+$/u.test(str);

export const isValidHexFormat = (str: string) => /^(?:[A-Fa-f0-9]{2})+$/u.test(str);

export const isValidVersionFormat = (str: string) => /^[0-9]+\.[0-9]+\.[0-9]+$/u.test(str);
