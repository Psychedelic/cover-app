import {Principal} from '@dfinity/principal';

export const isPrincipal = (str: string) => {
  try {
    return Principal.fromText(str).toText() === str;
  } catch (_) {
    return false;
  }
};
