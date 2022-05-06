import {Ed25519KeyIdentity} from '@dfinity/identity';
import {AnonymousBuildRequest, Cover} from '@psychedelic/cover';

export const coverSDK = new Cover(Ed25519KeyIdentity.generate(), {
  isDevelopment: import.meta.env.VITE_SDK_MODE === 'development'
});

export const coverAnonymousBuild = (buildConfig: AnonymousBuildRequest) =>
  Cover.anonymousBuild(buildConfig, {isDevelopment: import.meta.env.VITE_SDK_MODE === 'development'});
