export interface Verification {
  isVerified?: boolean;
  canisterId?: string;
  name?: string;
  repo?: string;
  gitCommit?: string;
  wasmHash?: string;
  lastActivity?: Date;
  callerId?: string;
  delegateCanisterId?: string;
  repoVisibility?: string;
  rustVersion?: string;
  canisterType?: string;
  dfxVersion?: string;
  optimizeCount?: string;
  buildWasmHash?: string;
  buildUrl?: string;
  buildStatus?: string;
}
