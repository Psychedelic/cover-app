import {Ed25519KeyIdentity} from '@dfinity/identity';
import {Cover} from '@psychedelic/cover';

export const coverSDK = new Cover(Ed25519KeyIdentity.generate());
