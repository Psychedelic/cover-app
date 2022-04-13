import React, {ReactEventHandler, ReactNode} from 'react';

import {CSS} from '@stitches/react';

import {StitchesButton} from './button.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesButton> {
  css?: CSS;
  children: ReactNode;
  onClick?: ReactEventHandler;
}

export const Button: React.FC<PropTypes> = ({css, children, onClick, type, size}) => (
  <StitchesButton css={css} onClick={onClick} size={size} type={type}>
    {children}
  </StitchesButton>
);

Button.defaultProps = {
  css: {},
  onClick: _e => {}
};
