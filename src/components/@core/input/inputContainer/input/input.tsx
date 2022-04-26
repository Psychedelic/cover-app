import React, {ReactEventHandler} from 'react';

import {CSS} from '@stitches/react';

import {StitchesInput} from './input.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesInput> {
  css?: CSS;
  onInput: ReactEventHandler;
}

export const Input: React.VFC<PropTypes> = React.memo(
  React.forwardRef(({size, css, placeholder, onInput}, ref) => (
    <StitchesInput css={css} onInput={onInput} placeholder={placeholder} ref={ref} size={size} />
  ))
);
