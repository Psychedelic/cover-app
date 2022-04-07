import React from 'react';

import {describe, expect, it} from 'vitest';

import App from './App';
import {customRender, screen, userEvent} from './testUtils';

describe('Simple working test', () => {
  it('the title is visible', () => {
    customRender(<App />);
    expect(screen.getByText(/Hello Vite \+ React!/i)).toBeInTheDocument();
  });

  it('should increment count on click', async () => {
    customRender(<App />);
    userEvent.click(screen.getByRole('button'));
    expect(await screen.findByText(/count is: 1/i)).toBeInTheDocument();
  });
});
