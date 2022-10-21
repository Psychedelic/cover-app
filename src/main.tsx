import {StrictMode} from 'react';

import {createRoot} from 'react-dom/client';

import {Core} from '@/components';
import {globalStyles} from '@/themes';

import {App} from './app';
import {AuthenticationProvider, CoverSettingsProvider} from './contexts';

const container = document.getElementById('root');

const root = createRoot(container as HTMLElement);

globalStyles();

root.render(
  <StrictMode>
    <CoverSettingsProvider>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </CoverSettingsProvider>
    <Core.GitInfo />
  </StrictMode>
);
