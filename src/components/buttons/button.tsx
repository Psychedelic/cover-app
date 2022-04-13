import React, {ReactEventHandler, ReactNode} from 'react';

import {CSS} from '@stitches/react';

import {StitchesButton} from './btn.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesButton> {
  css: CSS;
  children: ReactNode;
  onClick: ReactEventHandler;
}

export const Button: React.FC<PropTypes> = ({css, children, onClick}) => (
  <StitchesButton css={css} onClick={onClick}>
    {children}
  </StitchesButton>
);
