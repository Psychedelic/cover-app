import React from 'react';

import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CSS} from '@stitches/react';

import {StitchesInputContainer} from './inputContainer.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesInputContainer> {
  css?: CSS;
  icon?: IconProp;
}

export const InputContainer: React.FC<PropTypes> = ({bg, css, children, icon}) => (
  <StitchesInputContainer bg={bg} css={css}>
    {icon && <FontAwesomeIcon icon={icon} />}
    {children}
  </StitchesInputContainer>
);
