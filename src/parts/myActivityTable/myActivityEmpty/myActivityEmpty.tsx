import {emptyActivity} from '@/assets';

import {
  StitchesTableEmptyCell,
  StitchesTableEmptyContent,
  StitchesTableEmptyMainText,
  StitchesTableEmptyRow
} from './myActivityEmpty.styled';

export const MyActivityEmpty = () => (
  <StitchesTableEmptyRow>
    <StitchesTableEmptyCell colSpan={4}>
      <StitchesTableEmptyContent>
        <img alt={'empty activity'} src={emptyActivity} />
        <StitchesTableEmptyMainText>{'No Recent Activities to keep you posted.'}</StitchesTableEmptyMainText>
      </StitchesTableEmptyContent>
    </StitchesTableEmptyCell>
  </StitchesTableEmptyRow>
);
