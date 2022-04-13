import React from 'react';

import {CSS} from '@stitches/react';

import {StitchesStatusDot} from './statusDot.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesStatusDot> {
  css?: CSS;
}

export const StatusDot: React.FC<PropTypes> = ({css, status}) => <StitchesStatusDot css={css} status={status} />;

StatusDot.defaultProps = {
  css: {}
};
