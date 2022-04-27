import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesPageContainer = styled('div', {
  display: 'inline-flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
  padding: '$25',
  rowGap: '$30'
});
