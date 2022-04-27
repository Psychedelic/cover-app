import React from 'react';

import {CSS} from '@stitches/react';

import {StitchesFormContainer} from './formContainer.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesFormContainer> {
  css?: CSS;
  children?: React.ReactElement;
}

export const FormContainer: React.FC<PropTypes> = ({css, children}) => (
  <StitchesFormContainer css={css}>{children}</StitchesFormContainer>
);
