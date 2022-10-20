import {Principal} from '@dfinity/principal';

export const isPrincipal = (str: string) => {
  try {
    return Principal.fromText(str).toText() === str;
  } catch (e) {
    console.error(e);
    return false;
  }
};
