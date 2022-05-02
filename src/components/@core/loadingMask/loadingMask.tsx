import React from 'react';

import {StitchesLoadingMask} from './loadingMask.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesLoadingMask> {
  children?: React.ReactElement;
  depth?: number;
}

export const LoadingMask: React.FC<PropTypes> = ({children, size, depth = 1}) => {
  let depthCount = 0;
  let child = children;
  while (depthCount !== depth) {
    child = child?.props?.children;
    depthCount += 1;
  }
  return child ? (children as React.ReactElement) : <StitchesLoadingMask size={size} />;
};
