import {Ed25519KeyIdentity} from '@dfinity/identity';
import {Principal} from '@dfinity/principal';
import {
  AnonymousBuildConfigRequest,
  AnonymousBuildRequest,
  AnonymousBuildWithConfigRequest,
  Cover,
  CoverMetadata,
  CoverMetadataRequest
} from '@psychedelic/cover';

export const coverSDK = new Cover(Ed25519KeyIdentity.generate(), {
  isDevelopment: import.meta.env.VITE_SDK_MODE === 'development'
});

export const anonymousBuild = (buildRequest: AnonymousBuildRequest) =>
  Cover.anonymousBuild(buildRequest, {isDevelopment: import.meta.env.VITE_SDK_MODE === 'development'});

export const anonymousSaveBuildConfig = (buildConfigRequest: AnonymousBuildConfigRequest) =>
  Cover.anonymousSaveBuildConfig(buildConfigRequest, {isDevelopment: import.meta.env.VITE_SDK_MODE === 'development'});

export const anonymousBuildWithConfig = (buildWithConfigRequest: AnonymousBuildWithConfigRequest) =>
  Cover.anonymousBuildWithConfig(buildWithConfigRequest, {
    isDevelopment: import.meta.env.VITE_SDK_MODE === 'development'
  });

export const buildWithCoverMetadata = (coverMetadataRequest: CoverMetadataRequest) =>
  Cover.buildWithCoverMetadata(coverMetadataRequest, {
    isDevelopment: import.meta.env.VITE_SDK_MODE === 'development'
  });

export const anonymousCoverMetadata = (canisterId: string): Promise<CoverMetadata> =>
  Cover.anonymousCoverMetadata(Principal.from(canisterId));
