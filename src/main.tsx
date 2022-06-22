import {StrictMode} from 'react';

import {createRoot} from 'react-dom/client';

import {Core} from '@/components';

import {App} from './app';

const container = document.getElementById('root');

const root = createRoot(container as HTMLElement);

root.render(
  <StrictMode>
    <App />
    <Core.GitInfo />
  </StrictMode>
);
