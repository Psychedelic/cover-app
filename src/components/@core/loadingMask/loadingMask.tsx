import {ComponentProps, FC, ReactElement} from 'react';

import {StitchesLoadingMask} from './loadingMask.styled';

interface PropTypes extends ComponentProps<typeof StitchesLoadingMask> {
  children?: ReactElement;
  depth?: number;
}

export const LoadingMask: FC<PropTypes> = ({children, size, depth = 1}) => {
  let depthCount = 0;
  let child = children;
  while (depthCount !== depth) {
    child = child?.props?.children;
    depthCount += 1;
  }
  return child ? (children as ReactElement) : <StitchesLoadingMask data-loading-mask={'true'} size={size} />;
};
