import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesPageContainer = styled('div', {
  display: 'inline-flex',
  flexDirection: 'column',
  width: '100%',
  padding: '$25 $0 $35 $0',
  rowGap: '$30'
});
