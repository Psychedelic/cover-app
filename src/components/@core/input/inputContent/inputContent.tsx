import {ReactEventHandler} from 'react';

import {CSS} from '@stitches/react';

import {StitchesInputContent} from './inputContent.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesInputContent> {
  css?: CSS;
  onInput: ReactEventHandler;
  id?: string;
}

export const InputContent: React.VFC<PropTypes> = ({size, css, placeholder, onInput, id}) => (
  <StitchesInputContent css={css} id={id} onInput={onInput} placeholder={placeholder} size={size} />
);
