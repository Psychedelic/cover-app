import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesHeaderContainer = styled('div', {
  display: 'inline-flex'
});

export const StitchesMainHeader = styled('div', {
  display: 'inline-flex',
  rowGap: '$10',
  columnGap: '$15'
});

export const StitchesSecondaryHeader = styled('div', {
  display: 'inline-flex'
});
