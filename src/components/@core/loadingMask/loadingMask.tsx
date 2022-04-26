import React from 'react';

import {StitchesLoadingMask} from './loadingMask.styled';

type PropTypes = React.ComponentProps<typeof StitchesLoadingMask>;

export const LoadingMask: React.FC<PropTypes> = ({children, size}) =>
  (children as React.ReactElement)?.props?.children ? children : <StitchesLoadingMask size={size} />;
