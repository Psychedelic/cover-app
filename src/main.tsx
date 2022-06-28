import {StrictMode} from 'react';

import {createRoot} from 'react-dom/client';

import {Core} from '@/components';

import {App} from './app';
import {CoverSettingsProvider} from './contexts';

const container = document.getElementById('root');

const root = createRoot(container as HTMLElement);

root.render(
  <StrictMode>
    <CoverSettingsProvider>
      <App />
    </CoverSettingsProvider>
    <Core.GitInfo />
  </StrictMode>
);
