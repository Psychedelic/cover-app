import {Ed25519KeyIdentity} from '@dfinity/identity';
import {Principal} from '@dfinity/principal';
import {AnonymousBuildRequest, Cover, CoverMetadata} from '@psychedelic/cover';

export const coverSDK = new Cover(Ed25519KeyIdentity.generate(), {
  isDevelopment: import.meta.env.VITE_SDK_MODE === 'development'
});

export const anonymousBuild = (buildConfig: AnonymousBuildRequest) =>
  Cover.anonymousBuild(buildConfig, {isDevelopment: import.meta.env.VITE_SDK_MODE === 'development'});

export const buildWithCoverMetadata = (canisterId: string, repoAccessToken?: string) =>
  Cover.buildWithCoverMetadata(canisterId, repoAccessToken, {
    isDevelopment: import.meta.env.VITE_SDK_MODE === 'development'
  });

export const anonymousCoverMetadata = (canisterId: string): Promise<CoverMetadata> =>
  Cover.anonymousCoverMetadata(Principal.from(canisterId));
