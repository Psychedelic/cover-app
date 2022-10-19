export interface BuildConfig {
  lastActivity?: Date;
  canisterId?: string;
  callerId?: string;
  delegateCanisterId?: string;
  dfxVersion?: string;
  name?: string;
  gitCommit?: string;
  repo?: string;
  rustVersion?: string;
  optimizeCount?: string;

  // Verification info
  isVerified?: boolean;
  wasmHash?: string;

  // Last verification build
  lastBuildWasmHash?: string;
  lastBuildUrl?: string;
  lastBuildStatus?: string;
  lastBuildRepoVisibility?: string;
  lastBuildCanisterType?: string;
}
