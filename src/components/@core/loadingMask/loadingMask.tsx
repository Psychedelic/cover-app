import React from 'react';

import {StitchesLoadingMask} from './loadingMask.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesLoadingMask> {
  children?: React.ReactElement;
  nested?: number;
}

export const LoadingMask: React.FC<PropTypes> = ({children, size, nested = 1}) => {
  let count = 0;
  let child = children;
  while (count !== nested) {
    child = child?.props?.children;
    count += 1;
  }
  return child ? (children as React.ReactElement) : <StitchesLoadingMask size={size} />;
};
