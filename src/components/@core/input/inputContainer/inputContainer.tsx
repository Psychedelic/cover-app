import {ComponentProps, FC} from 'react';

import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CSS} from '@stitches/react';

import {StitchesInputContainer} from './inputContainer.styled';

interface PropTypes extends ComponentProps<typeof StitchesInputContainer> {
  css?: CSS;
  icon?: IconProp;
  iconColor?: string;
}

export const InputContainer: FC<PropTypes> = ({size, bg, css, children, icon, iconColor}) => (
  <StitchesInputContainer bg={bg} css={css} size={size}>
    {icon && <FontAwesomeIcon color={iconColor} icon={icon} />}
    {children}
  </StitchesInputContainer>
);
