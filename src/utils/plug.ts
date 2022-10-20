import {_SERVICE as CoverActor, idlFactory} from '@psychedelic/cover';

import {COVER_CANISTER_ID} from '@/constants';

interface Plug {
  ic?: {
    plug?: {
      coverActor?: CoverActor | null;
      isConnected: () => Promise<boolean>;
      disconnect: () => Promise<void>;
      requestConnect: (opts: {whitelist: string[]; host: string; onConnectionUpdate: () => void}) => Promise<void>;
      createActor: (opts: {canisterId: string; interfaceFactory: unknown}) => Promise<CoverActor>;
      sessionManager?: {
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

const initPlugAuthentication = async (isAuthenticated: boolean) => {
  const pid = getPlugInstance().sessionManager?.sessionData?.principalId;
  getPlugInstance().coverActor = isAuthenticated
    ? await getPlugInstance().createActor({
        canisterId: COVER_CANISTER_ID,
        interfaceFactory: idlFactory
      })
    : null;
  return {pid};
};

export const plugDisconnect = () => getPlugInstance().disconnect();

export const getPlugAuthentication = async () => {
  const isAuthenticated = await getPlugInstance().isConnected();
  const {pid} = await initPlugAuthentication(isAuthenticated);
  return {isAuthenticated, pid};
};

export const plugConnect = async (onConnectionUpdate?: () => Promise<void>) => {
  await getPlugInstance().requestConnect({
    whitelist: [COVER_CANISTER_ID],
    host: 'https://mainnet.dfinity.network',
    onConnectionUpdate: async () => {
      await initPlugAuthentication(true);
      onConnectionUpdate && (await onConnectionUpdate());
    }
  });
};

export const getPlugCoverActor = (): CoverActor => {
  const coverActor = getPlugInstance().coverActor;
  if (coverActor) {
    return coverActor;
  }
  throw new Error('CoverActor not found.');
};
