import React, {ReactEventHandler} from 'react';

import {CSS} from '@stitches/react';

import {StitchesButton} from './button.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesButton> {
  css?: CSS;
  onClick?: ReactEventHandler;
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, PropTypes>(
  ({css, children, onClick, type, size, disabled}, ref) => (
    <StitchesButton css={css} disabled={disabled} onClick={onClick} ref={ref} size={size} type={type}>
      {children}
    </StitchesButton>
  )
);

Button.displayName = 'Button';
