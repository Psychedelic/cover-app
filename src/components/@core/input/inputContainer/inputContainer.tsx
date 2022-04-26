import React from 'react';

import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {CSS} from '@stitches/react';

import {Core} from '@/components';

import {StitchesInputContainer} from './inputContainer.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesInputContainer> {
  css?: CSS;
  icon?: IconProp;
  iconColor?: string;
}

export const InputContainer: React.FC<PropTypes> = ({size, bg, css, children, icon, iconColor}) => (
  <StitchesInputContainer bg={bg} css={css} size={size}>
    {icon && <Core.FontIcon color={iconColor} icon={icon} />}
    {children}
  </StitchesInputContainer>
);
