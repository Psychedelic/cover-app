import {ReactElement} from 'react';

import {render} from '@testing-library/react';

export * from '@testing-library/react';
export {default as userEvent} from '@testing-library/user-event';

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, {
    // Wrap provider(s) here if needed
    wrapper: ({children}) => children,
    ...options
  });

export {customRender};
