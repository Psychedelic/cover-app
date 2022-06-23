import {gitBranch, gitCommitHash} from './generatedGitInfo.json';
import {StitchesGitInfo} from './gitInfo.styled';

export const GitInfo = () => (
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
);
