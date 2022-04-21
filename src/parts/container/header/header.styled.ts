import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesHeaderContainer = styled('header', {
  display: 'inline-flex',
  width: '100%'
});

export const StitchesMainHeader = styled('div', {
  display: 'inline-flex',
  rowGap: '$10',
  columnGap: '$15',
  width: '100%'
});

export const StitchesSecondaryHeader = styled('div', {
  display: 'inline-flex',
  justifyContent: 'flex-end',
  width: '100%'
});
