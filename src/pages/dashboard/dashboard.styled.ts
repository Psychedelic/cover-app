import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const ContentContainer = styled('div', {
  display: 'inline-flex',
  columnGap: '$30'
});

export const LeftContent = styled('div', {});

export const RightContent = styled('div', {
  display: 'inline-flex',
  flexDirection: 'column',
  rowGap: '$30'
});
