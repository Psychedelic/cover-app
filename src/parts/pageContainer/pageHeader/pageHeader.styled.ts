import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesPageHeaderContainer = styled('header', {
  display: 'inline-flex',
  justifyContent: 'center',
  columnGap: '$30',
  width: '100%'
});

export const StitchesPageMainHeader = styled('div', {
  display: 'inline-flex',
  rowGap: '$10',
  columnGap: '$15',
  width: '850px'
});

export const StitchesPageSecondaryHeader = styled('div', {
  display: 'inline-flex',
  justifyContent: 'flex-end',
  width: '350px'
});
