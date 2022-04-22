import React, {ReactEventHandler} from 'react';

import {CSS} from '@stitches/react';

import {StitchesInputContent} from './inputContent.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesInputContent> {
  css?: CSS;
  onInput: ReactEventHandler;
}

export const InputContent: React.VFC<PropTypes> = React.forwardRef(({size, css, placeholder, onInput}, ref) => (
  <StitchesInputContent css={css} onInput={onInput} placeholder={placeholder} ref={ref} size={size} />
));

InputContent.displayName = 'InputContent';
