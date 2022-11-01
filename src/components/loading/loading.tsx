import {loading} from '@/assets';

import {StitchesLoadingContainer, StitchesLoadingIcon, StitchesLoadingText} from './loading.styled';

export const Loading = () => (
  <StitchesLoadingContainer>
    <StitchesLoadingIcon alt={'loading'} src={loading} />
    <StitchesLoadingText>{'Loading Information...'}</StitchesLoadingText>
  </StitchesLoadingContainer>
);
