import {CSS} from '@stitches/react';

import {StitchesInputContent} from './inputContent.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesInputContent> {
  css?: CSS;
}

export const InputContent: React.VFC<PropTypes> = ({size, css, placeholder}) => (
  <StitchesInputContent css={css} placeholder={placeholder} size={size} />
);
