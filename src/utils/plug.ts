import {_SERVICE as CoverActor, idlFactory} from '@psychedelic/cover';

import {COVER_CANISTER_ID} from '@/constants';

interface Plug {
  ic?: {
    plug?: {
      coverActor?: CoverActor | null;
      isConnected: () => Promise<boolean>;
      disconnect: () => Promise<void>;
      requestConnect: (opts: {whitelist: string[]; host: string}) => Promise<void>;
      createActor: (opts: {canisterId: string; interfaceFactory: unknown}) => Promise<CoverActor>;
      sessionManager: {
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

const initPlugAuthentication = async (isAuthenticated: boolean, onConnectionUpdate?: () => Promise<void>) => {
  const pid = getPlugInstance().sessionManager.sessionData?.principalId;

  // Set actor
  getPlugInstance().coverActor = isAuthenticated
    ? await getPlugInstance().createActor({
        canisterId: COVER_CANISTER_ID,
        interfaceFactory: idlFactory
      })
    : null;

  // Set onConnectionUpdate handler
  getPlugInstance().sessionManager.onConnectionUpdate = onConnectionUpdate;

  return {pid};
};

export const plugDisconnect = () => {
  getPlugInstance().coverActor = null;
  getPlugInstance().sessionManager.onConnectionUpdate = null;
  getPlugInstance().disconnect();
};

export const getPlugAuthentication = async (onConnectionUpdate?: () => Promise<void>) => {
  const isAuthenticated = await getPlugInstance().isConnected();
  const {pid} = await initPlugAuthentication(isAuthenticated, onConnectionUpdate);
  return {isAuthenticated, pid};
};

export const plugConnect = async () => {
  await getPlugInstance().requestConnect({
    whitelist: [COVER_CANISTER_ID],
    host: 'https://mainnet.dfinity.network'
  });
};

export const getPlugCoverActor = (): CoverActor => {
  const coverActor = getPlugInstance().coverActor;
  if (coverActor) {
    return coverActor;
  }
  throw new Error('CoverActor not found.');
};
