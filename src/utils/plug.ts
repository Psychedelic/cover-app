import {_SERVICE as CoverActor, idlFactory} from '@psychedelic/cover';

import {COVER_CANISTER_ID} from '@/constants';

interface Plug {
  ic?: {
    plug?: {
      isConnected: () => Promise<boolean>;
      disconnect: () => Promise<void>;
      requestConnect: (opts: {whitelist: string[]; host: string}) => Promise<void>;
      createActor: (opts: {canisterId: string; interfaceFactory: unknown}) => Promise<CoverActor>;
      sessionManager: {
        coverActor?: CoverActor | null;
        onConnectionUpdate?: (() => Promise<void>) | null;
        sessionData?: {
          principalId: string;
        };
      };
    };
  };
}

const getPlugInstance = () => {
  const plugInstance = (window as Plug)?.ic?.plug;
  if (plugInstance) return plugInstance;
  throw new Error('Plug not found.');
};

export const initPlugPersistenceData = async (isAuthenticated: boolean, onConnectionUpdate?: () => Promise<void>) => {
  // Set actor
  getPlugInstance().sessionManager.coverActor = isAuthenticated
    ? await getPlugInstance().createActor({
        canisterId: COVER_CANISTER_ID,
        interfaceFactory: idlFactory
      })
    : null;

  // Set onConnectionUpdate handler
  getPlugInstance().sessionManager.onConnectionUpdate = onConnectionUpdate;
};

export const plugDisconnect = () => {
  getPlugInstance().sessionManager.coverActor = null;
  getPlugInstance().sessionManager.onConnectionUpdate = null;
  getPlugInstance().disconnect();
};

export const getPlugPrincipalId = () => getPlugInstance().sessionManager.sessionData?.principalId;

export const getPlugAuthentication = async () => {
  const isAuthenticated = await getPlugInstance().isConnected();
  return {isAuthenticated, pid: getPlugPrincipalId()};
};

export const plugConnect = async () => {
  await getPlugInstance().requestConnect({
    whitelist: [COVER_CANISTER_ID],
    host: 'https://mainnet.dfinity.network'
  });
};

export const getPlugCoverActor = (): CoverActor => {
  const coverActor = getPlugInstance().sessionManager.coverActor;
  if (coverActor) {
    return coverActor;
  }
  throw new Error('CoverActor not found.');
};
