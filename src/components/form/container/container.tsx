import React from 'react';

import {CSS} from '@stitches/react';

import {StitchesFormContainer} from './container.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesFormContainer> {
  css?: CSS;
  children?: React.ReactElement[];
}

export const Container: React.FC<PropTypes> = ({css, children}) => (
  <StitchesFormContainer css={css}>{children}</StitchesFormContainer>
);
