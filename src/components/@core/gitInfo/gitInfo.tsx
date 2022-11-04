import {useCallback, useEffect, useState} from 'react';

import {gitBranch, gitCommitHash} from './generatedGitInfo.json';
import {StitchesGitInfo} from './gitInfo.styled';

export const GitInfo = () => {
  const [windowSize, setWindowSize] = useState({height: window.innerHeight, width: window.innerWidth});

  const isDesktop = windowSize.width >= 1260 && windowSize.height >= 820;

  const updateWindowSize = useCallback(() => {
    setWindowSize({height: window.innerHeight, width: window.innerWidth});
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, [updateWindowSize]);

  return isDesktop ? (
    <StitchesGitInfo>
      <div>
        <span>
          {'Build version: '}
          {gitBranch}
          {'/'}
          {gitCommitHash}
        </span>
      </div>
    </StitchesGitInfo>
  ) : null;
};
