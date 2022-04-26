import React from 'react';

import {StitchesLoadingMask} from './loadingMask.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesLoadingMask> {
  children?: React.ReactElement;
}

export const LoadingMask: React.FC<PropTypes> = ({children, size}) =>
  children?.props?.children ? children : <StitchesLoadingMask size={size} />;
